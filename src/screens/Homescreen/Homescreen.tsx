import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useQuery} from '@realm/react';
import {useDispatch, useSelector} from 'react-redux';
import {
  setHeadlines,
  setLoading,
  updateCountryIndex,
} from '../../redux/newsSlice';
import {useRealmOperations} from '../../realm/remoteManager';
import {fetchHeadlines} from '../../services/Api/apiservices';
import {getRandomIndex} from '../../utils/utils';
import {countries} from '../../utils/utils';
import {useTheme} from '../../context/ThemeContext';
import NewsList from './components/NewsList';
import {addPinnedHeadline} from '../../redux/newsSlice';
import {useLoadHeadLines} from '../../hooks/useLoadHeadLines';

const Homescreen = () => {
  const {theme} = useTheme();
  const {saveHeadlines, clearHeadlines, updateHeadlineStatusById} =
    useRealmOperations();
  const [trigger, setTrigger] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedHeadlines, setDisplayedHeadlines] = useState<any[]>([]);
  const savedHeadlines = useQuery('News');
  const dispatch = useDispatch();
  const pinnedHeadline = useSelector(
    (state: any) => state.news.pinnedHeadlines,
  );

  const previousCountryIndex = useSelector(
    (state: any) => state.news.previousCountryIndex,
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const {loadHeadlines, loading} = useLoadHeadLines();

  const resetData = useCallback(() => {
    setDisplayedHeadlines([]);
    clearHeadlines();
    const newCountryIndex = getRandomIndex(previousCountryIndex, countries);
    loadHeadlines(true, newCountryIndex);
    // Start or restart the timer
    startTimer();
  }, [previousCountryIndex, countries]);

  const fetchNextBatch = useCallback(() => {
    if (currentIndex >= savedHeadlines.length && savedHeadlines?.length > 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      setCurrentIndex(0);
      resetData();
    } else {
      const batchSize = displayedHeadlines.length === 0 ? 10 : 5;
      const newIndex = currentIndex + batchSize;
      const nextBatch = savedHeadlines.slice(currentIndex, newIndex);
      setCurrentIndex(newIndex);
      setDisplayedHeadlines(prev => [...nextBatch, ...prev]);
    }
  }, [displayedHeadlines, savedHeadlines, resetData, currentIndex]);

  const onRefreshPress = useCallback(() => {
    fetchNextBatch();
    startTimer();
  }, [displayedHeadlines, savedHeadlines, resetData, currentIndex]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTrigger(true);
    }, 10000); // 4 seconds
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

  const onPinPressed = useCallback((item: {id: string}) => {
    dispatch(addPinnedHeadline(item));
  }, []);

  const onDeletePressed = useCallback(
    (item: {id: string}) => {
      updateHeadlineStatusById(item?.id);
      setDisplayedHeadlines((prev: any) => {
        let filteredData = prev?.map((headline: any) => {
          if (headline?.id !== item?.id) {
            return headline;
          } else {
            return {...headline, isDeleted: true};
          }
        });
        return filteredData;
      });
    },
    [savedHeadlines],
  );

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      {displayedHeadlines?.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={theme.colors.primary} />
        </View>
      ) : (
        <NewsList
          displayedHeadlines={displayedHeadlines?.filter(
            (item: any) => !item?.isDeleted,
          )}
          onRefreshPress={onRefreshPress}
          onPinPressed={onPinPressed}
          onDeletePressed={onDeletePressed}
          pinnedHeadline={pinnedHeadline}
        />
      )}
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
