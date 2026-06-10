import axios from 'axios';

const API_KEY = '56229939-82f9a1e756d4a9e445ea4f229';
const BASE_URL = 'https://pixabay.com/api/';

export function getImagesByQuery(query) {
  const searchParams = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  return axios.get(BASE_URL, { params: searchParams })
    .then(response => {
      return response.data;
    });
}