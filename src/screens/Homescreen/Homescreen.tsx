import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useQuery} from '@realm/react';
import {useDispatch, useSelector} from 'react-redux';
import {setHeadlines, updateCountryIndex} from '../../redux/newsSlice';
import {useRealmOperations} from '../../realm/remoteManager';
import BackgroundFetch from 'react-native-background-fetch';
import NewsListCard from './components/NewsListCard';
import useFetchDataHook from './hooks/usFetchDataHook';
import {fetchHeadlines} from '../../services/Api/apiservices';
import {getRandomIndex} from '../../utils/utils';
import {countries} from '../../utils/utils';

let timer: any;
const Homescreen = () => {
  const {saveHeadlines, clearHeadlines} = useRealmOperations();
  // const [timer, setTimer] = useState<NodeJS.Timeout | null>(false);
  const [trigger, setTrigger] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedHeadlines, setDisplayedHeadlines] = useState<any[]>([]);
  const savedHeadlines = useQuery('News');
  const dispatch = useDispatch();
  const previousCountryIndex = useSelector(
    (state: any) => state.news.previousCountryIndex,
  );

  const [loading, setLoading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const loadHeadlines = useCallback(
    async (initialLoad = false, countryIndex: number) => {
      try {
        dispatch(updateCountryIndex(countryIndex));
        const fetchedHeadlines = await fetchHeadlines(countries[countryIndex]);
        let mappedData = fetchedHeadlines.map((item, index) => ({
          ...item,
          id: `${index + 1}`,
          urlToImage: item?.urlToImage || '',
          author: item?.author || '',
          source: {
            id: item?.source?.id || index,
            name: item?.source?.name,
          },
        }));

        if (initialLoad) {
          saveHeadlines(mappedData);
          dispatch(setHeadlines(mappedData));
        } else {
          saveHeadlines(mappedData);
          dispatch(setHeadlines([...savedHeadlines, ...mappedData]));
        }
      } catch (error) {
        console.error('Error loading headlines:', error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, saveHeadlines, savedHeadlines],
  );

  const resetData = () => {
    setDisplayedHeadlines([]);
    clearHeadlines();
    const newCountryIndex = getRandomIndex(previousCountryIndex, countries);
    // dispatch(updateCountryIndex(newCountryIndex));
    loadHeadlines(true, newCountryIndex);
    // Start or restart the timer
    startTimer();
  };

  const fetchNextBatch = useCallback(() => {
    if (currentIndex >= savedHeadlines.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCurrentIndex(0);
      resetData();
    } else {
      const batchSize = displayedHeadlines.length === 0 ? 10 : 35;
      const newIndex = currentIndex + batchSize;
      const nextBatch = savedHeadlines.slice(currentIndex, newIndex);
      setCurrentIndex(newIndex);
      setDisplayedHeadlines(prev => [...nextBatch, ...prev]);
    }
  }, [displayedHeadlines, savedHeadlines, resetData, currentIndex]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTrigger(true);
    }, 4000); // 4 seconds
  }, [savedHeadlines]);

  useEffect(() => {
    if (savedHeadlines.length === 0) {
      loadHeadlines(true, 0); // Fetch and store initial data
    } else {
      fetchNextBatch(); // Fetch initial batch if data is already stored
    }
    startTimer();
    // Cleanup function to clear the timer
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (trigger && timerRef?.current) {
      fetchNextBatch();
      setTrigger(false);
    }
  }, [trigger, fetchNextBatch]);

  const renderItem = useCallback(({item}: any) => {
    return <NewsListCard data={item} />;
  }, []);
  return (
    <View style={{backgroundColor: 'white'}}>
      {!loading && displayedHeadlines && (
        <FlatList
          data={displayedHeadlines}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.id?.toString()}
          contentContainerStyle={{paddingBottom: 100}}
        />
      )}
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
