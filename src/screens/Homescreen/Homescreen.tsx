import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useQuery} from '@realm/react';
import {fetchHeadlines} from '../../services/Api/apiservices';
import {useDispatch} from 'react-redux';
import {setHeadlines} from '../../redux/newsSlice';
import {useRealmOperations} from '../../realm/remoteManager';

const Homescreen = () => {
  const {saveHeadlines, clearHeadlines} = useRealmOperations();
  const savedHeadlines = useQuery('News');
  const dispatch = useDispatch();
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
            return {...item, id: `${index + 1}`};
          });
          dispatch(setHeadlines(mappedData));
          saveHeadlines(mappedData);
        }
      } catch (error) {
        console.error('Error loading headlines:', error);
      }
    };

    loadHeadlines();
  }, []);
  return (
    <View>
      <Text>Homescreen</Text>
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({});
