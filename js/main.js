// import bsn from 'framework/bootstrap-native/bootstrap-native-v4';

class Connection {
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
        return fetch(`${this.movieSearchUrl}?api_key=${this.apiKey}&query=${movieTitle}`)
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

const addCarouselItem = async (movie, index) => {
    // GET templates
    const itemTemplate = await new Connection().getHTMLTemplate('carousel-item-template');
    const indicatorTemplate = await new Connection().getHTMLTemplate('carousel-indicator-template');

    // GET carousel element + creates tempalate initializer
    const carousel = document.querySelector('#moviesCarousel');
    const templateInitializer = document.createElement('html');

    // Initilizes itemTemplate
    templateInitializer.innerHTML = itemTemplate;
    templateInitializer.querySelector('.carousel-item img').src += movie.poster_path;
    templateInitializer.querySelector('.carousel-item h5').innerText = movie.title;
    templateInitializer.querySelector('.carousel-item p').innerText = movie.overview;
    const carouselItem = templateInitializer.querySelector('.carousel-item');

    // Initilizes indicatorTemplate
    templateInitializer.innerHTML = indicatorTemplate;
    templateInitializer.querySelector('li').dataset.slideTo = index;
    const carouselIndicator = templateInitializer.querySelector('li');

    // Appends HTML
    carousel.querySelector('.carousel-inner').append(carouselItem);
    carousel.querySelector('.carousel-indicators').append(carouselIndicator);
};

const addMoviesToCarousel = async (movies) => {
    // map works here but forEach doesn't because map returns an iterable of promises, while forEach returns nought
    await Promise.all(movies.map(addCarouselItem)).then(() => {
        new Carousel(document.querySelector('#moviesCarousel'), { // eslint-disable-line no-new, no-undef
            interval: 0,
        });
    });
};

// const getMovieCast = () => {
//     const movieTitle = document.querySelector('#movie-title-input').value;
//     new Connection().getMovies(movieTitle).then((movie) => {
//         new Connection().getCast(movie.id).then(() => {
//             // console.log(cast);
//         });
//     });
// };

const showCarousel = () => {
    document.querySelector('.movies-carousel').classList.add('mb-5');
    document.querySelector('.movies-carousel').classList.add('open');
};

const loadCarousel = () => {
    const movieTitle = document.querySelector('#movie-title-input').value;
    new Connection().getMovies(movieTitle).then((movies) => {
        addMoviesToCarousel(movies);
        showCarousel();
    });
};


// DOM Listeners
document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        document.querySelector('#movieForm').addEventListener('submit', (event) => {
            event.preventDefault(); // Prevents submit
            // getMovieCast(event.target[0].value); // movieTitle input value
            loadCarousel();
        });
    }
};
