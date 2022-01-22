export default class NewApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    
    featchArticles() {
        //console.log(this);
        const options = {
            headers: {
                ApiKey: '5c745d00a7194d29944a14455843bdb1',   //ключ IPI 
            },
        };

        //const url = 'https://newsapi.org/v2/everything?q=$(this.searchQueary)&language=en&pageSize=10&page=$(this.page)';
        const url = 'https://newsapi.org/v2/everything?q=tesla&from=2021-12-22&sortBy=publishedAt&apiKey=5c745d00a7194d29944a14455843bdb1'
        //const url = 'https://newsapi.org/v2/everything?q=Apple&from=2022-01-22&sortBy=popularity&apiKey=API_KEY'

        return fetch(url, options)       //Получаем промис/return
            .then(r => r.json())
            .then(data => {
                this.incrementPage();
        
                return data.articles;
            });
    }
        
    incrementPage() {
        this.page += 1;           //Добавление сл.страницы/увеличение
    }

    resetPage() {
        this.page = 1;            //След.поиск с 1 стр./сброс
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQueary = newQuery;
    }
}
