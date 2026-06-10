import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const queryValue = form.elements['search-text'].value.trim();

  if (queryValue === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please fill out the search field!',
      position: 'topRight',
    });
    return;
  }

  // Очищаємо попередні результати пошуку та вмикаємо лоадер перед запитом
  clearGallery();
  showLoader();

  // Робимо запит до Pixabay API
  getImagesByQuery(queryValue)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          messageColor: '#fff',
          backgroundColor: '#ef4040',
        });
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader(); 
      form.reset(); 
    });
}