// import axios from 'axios';

// async function makesRequest (search, pageAmount) {
//     const API_KEY = '25261319-41493d7d09d351884ef55fa82';
//     const BASE_URL = 'https://pixabay.com/api/';
//     const options = {
//         headers: {
//             key: API_KEY,   //ключ IPI 
//             q: search,
//             image_type: 'photo',
//             orientation: 'horizontal',
//             safesearch: true,
//             page: pageAmount,
//             per_page: 40,
//         },
//     }; 

//     const responce = await axios.get(URL, options);
//     return responce.data;
// }

// export { makesRequest };

// export default class inputText {
//     constructor() {
//         this.searchQuery = '';                     //Сервис отвечает за хранение запроса + номер группы
//         this.page = 1;
//     }
    
//     featchArticles() {
//          //const url = 'https://pixabay.com/api/?key=25371250-941ff682c7395853bb75ed125=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
//          const url = '$(BASE_URL)/?key=$(API_KEY)=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=$(this.page)';
//          const url = "https://pixabay.com/api/?key="+API_KEY+"&q=${search}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=$(this.page)";
//         return fetch(url, options)       //Получаем промис/return
//             .then(response => response.json())
//             .then(({ articles }) => {
//                 this.incrementPage();
        
//                 return articles;
//             });
    
//     }

//     incrementPage() {
//         this.page += 1;           //Добавление сл.страницы/увеличение
//     }

//     resetPage() {
//         this.page = 1;            //След.поиск с 1 стр./сброс
//     }

//     get query() {
//         return this.searchQuery;
//     }
//                                                 //Контролирует термин запроса
//     set query(newQuery) {
//         this.searchQueary = newQuery;
//     }
// }
