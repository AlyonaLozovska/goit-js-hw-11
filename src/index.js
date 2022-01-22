import './sass/common.scss';
import './css/styles.css';
import './js/news/news-service';
import NewsApiService from './js/news/news-service';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
    loadMoreBtn: document.querySelector('[data-action="load-more"]')
};
const newsApiService = new NewsApiService();

console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);


function onSearch(e) {
    e.preventDefault();        //Чтоб не перезагружалась страничка при субмите формы

    clearArticlesContainer();
    newsApiService.query = e.currentTarget.elements.query.value;
    newsApiService.resetPage();        //Сбрасываем форму на начало при вызове нового значения
    //newsApiService.fetchArticles().then(articles => console.log(articles));
    newsApiService.fetchArticles().then(appendArticlesMarkup);
}

function onLoadMore() {
    //newsApiService.fetchArticles().then(articles => console.log(articles));
    newsApiService.fetchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup(articles) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}                                                      //Вставляет результат вызова шаблона

function clearArticlesContainer() {
    refs.articlesContainer.innerHTML = '';              //Очищает контейнер при сл.запросе поиска
}