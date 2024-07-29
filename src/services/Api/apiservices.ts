import {newsMapper} from '../../realm/mapper/NewsMapper';
import {API_KEY} from '../../../config';

const API_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchHeadlines = async (country = 'in') => {
  try {
    const response = await fetch(
      `${API_URL}?country=${country}&category=business&apiKey=${API_KEY}&pageSize=100`,
    );
    const json = await response.json();
    let mappedData = newsMapper.toNewsMapper(json?.articles);
    return mappedData;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    throw error;
  }
};
