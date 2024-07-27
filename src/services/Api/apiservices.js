import axios from 'axios';
import {API_KEY} from '../../../config';

const API_URL = 'https://newsapi.org/v2/top-headlines';

export const fetchHeadlines = async () => {
  try {
    const response = await axios.get(
      `${API_URL}?country=in&category=business&apiKey${API_KEY}`,
    );
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching headlines:', error);
    throw error;
  }
};
