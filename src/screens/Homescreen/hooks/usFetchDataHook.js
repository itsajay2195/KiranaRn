import {useEffect} from 'react';
import {fetchHeadlines} from '../../../services/Api/apiservices';

const useFetchDataHook = (
  setHeadlines,
  saveHeadlines,
  startTimer,
  dispatch,
  fetchInitialData,
  fetchNextBatch,
) => {
  useEffect(() => {
    const loadHeadlines = async (initialLoad = false) => {
      try {
        // console.log('news>>>>', JSON.stringify(savedHeadlines, null, 3))
        const fetchedHeadlines = await fetchHeadlines();
        let mappedData = fetchedHeadlines?.map((item, index) => {
          return {
            ...item,
            id: `${index + 1}`,
            urlToImage: item?.urlToImage || '',
            author: item?.author || '',
            source: {
              id: item?.source?.id || index,
              name: item?.source?.name,
            },
          };
        });
        if (initialLoad) {
          saveHeadlines(mappedData);
          dispatch(setHeadlines(mappedData));
        } else {
          // Append new data to existing headlines
          saveHeadlines(mappedData);
          dispatch(setHeadlines([...savedHeadlines, ...mappedData]));
        }
      } catch (error) {
        console.error('Error loading headlines:', error);
      }
    };

    if (fetchInitialData) {
      loadHeadlines(true); // Fetch and store initial data
    } else {
      fetchNextBatch(); // Fetch initial batch if data is already stored
    }
    startTimer();
  }, []);
};

export default useFetchDataHook;
