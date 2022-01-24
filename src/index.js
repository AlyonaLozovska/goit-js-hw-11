import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './sass/common.scss';
import './css/styles.css';
import './sass/gallery.scss';
import './partials/gallery.html';
import itemsTemplate from './template/index.hbs';
import 'simplelightbox/dist/simple-lightbox.min.css';
//import SimpleLightbox from "simplelightbox";
//import makesRequest from './js/news-service';
//import smoothScroll from './js/scroll';


//const smoothScroll = new scroll();


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
      Notify.failure('Please enter your search data.');
      return;
    }

    pageAmount = 1;
    pageLength = 40;
    // refs.loadButton.classList.add('visually-hidden');

  
    const responce = await makesRequest(inputText, pageAmount);
    pageLength = responce.hits.length;

    if (responce.totalHits <= pageLength) {
      addISHidden();
    } else {
      removeIsHidden();
    }


    if (responce.totalHits === 0) {
      clearList();
      refs.endcollectionText.classList.add('is-hidden');
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
    try {
    
  if (responce.totalHits > 0) {
    Notify.success(`Hooray! We found ${responce.totalHits} images.`);
    createGalleryList(responce.hits);
  }

    if (responce.totalHits > 40) {
      refs.loadButton.classList.remove('visually-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}
        
    //inputText.resetPage();        //Сбрасываем форму на начало при вызове нового значения
    
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  try {
    refs.loadMoreBtn.disabled = true;
    pageIncrement();

    const responce = await makesRequest(inputText, pageAmount);

    createGalleryList(responce.hits);
    smoothScroll();

    pageLength += responce.hits.length;

    if (pageLength >= responce.totalHits) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      addISHidden();
    }
    refs.loadMoreBtn.disabled = false;
  } catch (error) {
    console.log(error);
  }
}

function createGalleryList(articles) {
  const markup = itemsTemplate(articles);
    refs.gallery.insertAdjacentHTML('beforeend', articlesTpl(articles));
    lightbox();
}                                                      //Вставляет результат вызова шаблона

function addISHidden() {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.endcollectionText.classList.remove('is-hidden');
}
function removeIsHidden() {
  refs.loadMoreBtn.classList.remove('is-hidden');
  refs.endcollectionText.classList.add('is-hidden');
}
function pageIncrement() {
  pageAmount += 1;
}


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