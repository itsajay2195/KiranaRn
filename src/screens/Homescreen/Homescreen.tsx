import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useQuery} from '@realm/react';
import {useDispatch} from 'react-redux';
import {setHeadlines} from '../../redux/newsSlice';
import {useRealmOperations} from '../../realm/remoteManager';
import BackgroundFetch from 'react-native-background-fetch';
import NewsListCard from './components/NewsListCard';
import useFetchDataHook from './hooks/usFetchDataHook';

const Homescreen = () => {
  const {saveHeadlines, clearHeadlines} = useRealmOperations();
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedHeadlines, setDisplayedHeadlines] = useState<any[]>([]);
  const savedHeadlines = useQuery('News');
  const dispatch = useDispatch();

  const fetchNextBatch = useCallback(() => {
    setCurrentIndex(prev => {
      const newIndex = prev + 10;
      const nextBatch = savedHeadlines.slice(prev, newIndex);
      setDisplayedHeadlines(nextBatch);
      return prev + 10;
    });
  }, []);

  const startTimer = useCallback(() => {
    if (timer) clearInterval(timer);
    const newTimer = setInterval(() => {
      fetchNextBatch();
    }, 10000); // 10 seconds
    setTimer(newTimer);
  }, []);

  useFetchDataHook(
    setHeadlines,
    saveHeadlines,
    startTimer,
    dispatch,
    savedHeadlines.length === 0,
    fetchNextBatch,
  );

  const renderItem = useCallback(({item}: any) => {
    return <NewsListCard data={item} />;
  }, []);
  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        data={displayedHeadlines}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id?.toString()}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
