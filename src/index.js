import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './sass/common.scss';
import './css/styles.css';
import './sass/gallery.scss';
import './partials/gallery.html';
import itemsTemplate from './template/index.hbs';
// import inputText from './js/news/news-service';
//import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

// const makesRequest  = new inputText ();

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};


let pageAmount = 1;
let inputText = '';
let pageLength = 0;

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


 async function onSearch(e) {
    e.preventDefault();        //Чтоб не перезагружалась страничка при субмите формы
    //clearList();
    
     inputText = e.currentTarget.elements.searchQuery.value.trim;
    // inputText = e.currentTarget.elements.query.value.trim;

    if(inputText === '') {
      clearList();
      return;
    }

    pageAmount = 1;
    pageLength = 40;
    //refs.loadButton.classList.add('visually-hidden');

  try {
    const responce = await makesRequest(inputText, pageAmount);

    if (responce.totalHits === 0) {
      clearList();
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');

      return;
    }

    Notify.success(`Hooray! We found ${responce.totalHits} images.`);
    createGalleryList(responce.hits);

    if (responce.totalHits > 40) {
      refs.loadButton.classList.remove('visually-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}
        
    //inputText.resetPage();        //Сбрасываем форму на начало при вызове нового значения
    
    // inputText.fetchArticles().then(articles => {
    //     clearArticlesContainer();
    //     appendArticlesMarkup(articles);
    // });


// async function onLoadMore() {
//     inputText.fetchArticles().then(appendArticlesMarkup);
//     smoothScroll();
// }

async function onLoadMore() {
  try {
    pageAmount += 1;
    const responce = await makesRequest(inputText, pageAmount);

    createGalleryList(responce.hits);
    smoothScroll();

    pageLength += responce.hits.length;

    if (pageLength >= responce.totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadButton.classList.add('visually-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

function createGalleryList(articles) {
  const markup = itemsTemplate(articles);
    refs.gallery.insertAdjacentHTML('beforeend', articlesTpl(articles));
    lightbox();
}                                                      //Вставляет результат вызова шаблона

function clearList() {
    refs.gallery.innerHTML = '';              //Очищает контейнер при сл.запросе поиска
}

function lightbox() {
    let lightbox = new SimpleLightbox('.gallery a', {
      captions: false,
      captionDelay: 250,
      enableKeyboard: true,
      doubleTapZoom: 5,
    });
    lightbox.refresh();
  }
  
  function smoothScroll() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }