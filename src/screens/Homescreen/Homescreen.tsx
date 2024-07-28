import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useQuery} from '@realm/react';
import {fetchHeadlines} from '../../services/Api/apiservices';
import {useDispatch} from 'react-redux';
import {setHeadlines} from '../../redux/newsSlice';
import {useRealmOperations} from '../../realm/remoteManager';
import BackgroundFetch from 'react-native-background-fetch';
import NewsListCard from './components/NewsListCard';

const Homescreen = () => {
  const {saveHeadlines, clearHeadlines} = useRealmOperations();
  const savedHeadlines = useQuery('News');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Configure Background Fetch
  //   console.log('in 1');
  //   BackgroundFetch.configure(
  //     {
  //       minimumFetchInterval: 15, // Minimum interval in minutes
  //       stopOnTerminate: false, // Continue background fetch after app termination
  //       startOnBoot: true, // Start fetch on device boot
  //     },
  //     async taskId => {
  //       console.log('[BackgroundFetch] taskId:', taskId);

  //       // Fetch the top 100 headlines
  //       try {
  //         console.log('ommale');
  //       } catch (error) {
  //         console.error('Failed to fetch headlines:', error);
  //       }

  //       // Finish the background fetch task
  //       BackgroundFetch.finish(taskId);
  //     },
  //     error => {
  //       console.error('[BackgroundFetch] failed to start:', error);
  //     },
  //   );

  //   // Clean up
  //   return () => {
  //     BackgroundFetch.stop();
  //   };
  // }, []);

  useEffect(() => {
    const loadHeadlines = async () => {
      try {
        // console.log('news>>>>', JSON.stringify(savedHeadlines, null, 3));
        if (savedHeadlines.length > 0) {
          console.log('if1>>');
          //   dispatch(setHeadlines(savedHeadlines));
        } else {
          const fetchedHeadlines = await fetchHeadlines();
          let mappedData = fetchedHeadlines?.map((item, index) => {
            return {
              ...item,
              id: `${index + 1}`,
              urlToImage: item?.urlToImage || '',
              author: item?.author || '',
              source: {id: item?.source?.id || index, name: item?.source?.name},
            };
          });
          console.log(JSON.stringify(mappedData, null, 3));
          dispatch(setHeadlines(mappedData));
          saveHeadlines(mappedData);
        }
      } catch (error) {
        console.error('Error loading headlines:', error);
      }
    };

    loadHeadlines();
  }, []);

  const renderItem = useCallback(({item}: any) => {
    return <NewsListCard data={item} />;
  }, []);
  return (
    <View style={{backgroundColor: 'white'}}>
      <FlatList
        data={savedHeadlines}
        renderItem={renderItem}
        keyExtractor={(item, index) => item?.id?.toString()}
        contentContainerStyle={{paddingBottom: 100}}
      />
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
