class Connection {
    constructor() {
        this.apiKey = 'e5eee0efae5b0226ec8670bdf1fd1380';
        this.movieSearchUrl = 'https://api.themoviedb.org/3/search/movie';
        this.imgUrl = 'http://image.tmdb.org/t/p/w300/';
        this.peopleUrl = 'https://api.themoviedb.org/3/person/';
        this.castUrl = 'https://api.themoviedb.org/3/movie';
    }

    async getMovie(movieTitle) {
        return fetch(`${this.movieSearchUrl}?api_key=${this.apiKey}&query=${movieTitle}`)
            .then(response => response.json())
            .then(movies => movies.results[0]);
    }

    async getCast(movieId) {
        return fetch(`${this.castUrl}/${movieId}/credits?api_key=${this.apiKey}`)
            .then(response => response.json())
            .then(credits => credits.cast);
    }
}

const getMovieCast = () => {
    const movieTitle = document.querySelector('#movie-title').value;
    new Connection().getMovie(movieTitle).then((movie) => {
        new Connection().getCast(movie.id).then(() => {
            // console.log(cast);
        });
    });
};

document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        // DOM Listeners
        document.querySelector('#movieForm').addEventListener('submit', (event) => {
            event.preventDefault(); // prevents submit
            getMovieCast(event.target[0].value); // movieTitle input value
        });
    }
};
