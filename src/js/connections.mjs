export class Connection {
    constructor() {
        this.templatePath = 'HTML-templates';
        this.apiKey = 'e5eee0efae5b0226ec8670bdf1fd1380';
        this.movieSearchUrl = 'https://api.themoviedb.org/3/search/movie';
        this.peopleUrl = 'https://api.themoviedb.org/3/person/';
        this.castUrl = 'https://api.themoviedb.org/3/movie';
    }

    async getHTMLTemplate(templateName) {
        return fetch(`${this.templatePath}/${templateName}.txt`)
            .then(response => response.text())
            .then(template => template)
            .catch(error => error);
    }

    async getMovies(movieTitle) {
        return fetch(`${this.movieSearchUrl}?api_key=${this.apiKey}&query=${movieTitle}&sort_by=release_date.asc`)
            .then(response => response.json())
            .then(data => data.results)
            .catch(error => error);
    }

    async getCast(movieId) {
        return fetch(`${this.castUrl}/${movieId}/credits?api_key=${this.apiKey}`)
            .then(response => response.json())
            .then(credits => credits.cast)
            .catch(error => error);
    }
}

export default Connection;
