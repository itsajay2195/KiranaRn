import {Alert} from 'react-native';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useQuery} from '@realm/react';
import {setHeadlines, setLoading, updateCountryIndex} from '../redux/newsSlice';
import {fetchHeadlines} from '../services/Api/apiservices';
import {countries, getColorForChar} from '../utils/utils';
import {useRealmOperations} from '../realm/remoteManager';

export const useLoadHeadLines = (navigation?: any) => {
  const dispatch = useDispatch();
  const savedHeadlines = useQuery('News');
  const {saveHeadlines} = useRealmOperations();
  const loading = useSelector((state: any) => state.news.loading);
  const loadHeadlines = useCallback(
    async (initialLoad = false, countryIndex: number) => {
      dispatch(setLoading(true));
      try {
        dispatch(updateCountryIndex(countryIndex));
        const fetchedHeadlines = await fetchHeadlines(countries[countryIndex]);
        let mappedData = fetchedHeadlines?.map((item, index) => ({
          ...item,
          id: `${index + 1}`,
          urlToImage: item?.urlToImage || '',
          author: item?.author || '',
          isDeleted: false,
          textBgColor: getColorForChar(item?.author?.[0]),
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
        // console.log('error is', error);
        Alert.alert('Error loading headlines:');
      } finally {
        dispatch(setLoading(false));
        if (navigation) {
          navigation?.navigate('Home');
        }
      }
    },
    [dispatch, savedHeadlines, saveHeadlines, navigation],
  );
  return {loadHeadlines, loading};
};
