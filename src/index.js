import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './sass/common.scss';
import './css/styles.css';
import './sass/gallery.scss';
import './partials/gallery.html';
import itemsTemplate from './template/index.hbs';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from "simplelightbox";
import NewsApiService from './js/news-servise';
import LoadMoreButton from './js/load-more-btn';

const inputText = new NewsApiService();
const loadMoreBtn = new LoadMoreButton({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};




refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
// refs.loadMoreBtn.classList.add('is-hidden');


async function onSearch(e) {
  e.preventDefault();        //Чтоб не перезагружалась страничка при субмите формы
  
  if (!refs.loadMoreBtn.classList.contains('is-hidden')) {
    refs.loadMoreBtn.classList.add('is-hidden');
    };
  
  inputText.searchQuery = e.currentTarget.elements.searchQuery.value;
  inputText.resetPage();

   try {
  if(inputText.searchQuery === '') {
    clearList();
    Notiflix.Notify.failure('Please enter your search data.');
  }
  else {
    loadMoreBtn.show();
    loadMoreBtn.disable();
    const response = await inputText.makesRequest();
    const {
      data: { hits, total, totalHits },
          } = response;
          clearList();
          loadMoreBtn.enable();
  
          

  if (hits.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else {
    refs.loadMoreBtn.classList.remove('is-hidden');
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  createGalleryList(hits);
  }

  loadMoreBtn.show();
  // loadMoreBtn.disable();

}

} catch (error) {
Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
console.log(error.message);

loadMoreBtn.enable();
}
};

      

async function onLoadMore() {
// e.preventDefault();
// console.log('more');
const response = await inputText.makesRequest();
const {
  data: { hits },
} = response;

if (hits.length === 0) {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
} else createGalleryList(hits); 
};





async function createGalleryList(hits) {

const markup = itemsTemplate(hits);



refs.gallery.insertAdjacentHTML('beforeend', markup);                                                   //Вставляет результат вызова шаблона

simpleLightbox();
scroll();
  
};



function clearList() {
  refs.gallery.innerHTML = '';              //Очищает контейнер при сл.запросе поиска
}

function simpleLightbox() {
  let lightbox = new SimpleLightbox('.gallery a', {
    captions: false,
    captionDelay: 250,
    enableKeyboard: true,
    doubleTapZoom: 5,
  });
  lightbox.refresh();
}

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

