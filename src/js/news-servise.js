import axios from 'axios';


const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '25261319-41493d7d09d351884ef55fa82';


export default class NewsApiService {
    constructor() {
      this.searchQuery = '';
      this.perPage = 40;
      this.page = 1;
    };

async makesRequest () {
        const params = new URLSearchParams({
            key: API_KEY,   //ключ IPI 
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.pageAmount,
            per_page: this.perPage,
        });
        const url = `${BASE_URL}/?${params}`;
        this.incrementPage();
        return await axios.get(url);
    }; 

    
//     featchArticles(page) {
//        console.log(this);
//     try {
//        const url = await axios.get(
//         `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.pageAmount}&per_page=${this.perPage}',);
//        const images = await response.data;
//        return images;
//         } catch (error) {
//       console.log(error);
//    }
    
//    return fetch(
//     `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageAmount}`,
//     )
//     .then(response => response.json())
//     .then(console.log);
//   };



    incrementPage() {
        this.page += 1;           //Добавление сл.страницы/увеличение
    }

    resetPage() {
        this.page = 1;            //След.поиск с 1 стр./сброс
    }

    get query() {
        return this.searchQuery;
    }
                                                //Контролирует термин запроса
    set query(newQuery) {
        this.searchQueary = newQuery;
    }
}
