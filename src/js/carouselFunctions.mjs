import { Connection } from './connections';
import { Template } from './HTMLTemplates';

export const showCarousel = () => {
    document.querySelector('.movies-carousel').classList.remove('close');
    document.querySelector('.movies-carousel').classList.add('open');
};

export const hideCarousel = () => {
    document.querySelector('.movies-carousel').classList.remove('open');
    document.querySelector('.movies-carousel').classList.add('close');
};

export const destroyCarousel = () => {
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.innerHTML = '';
};

export const addCarouselItem = async (movie, index) => {
    // GET templates
    const carouselItem = new Template().carouselItem(movie.poster_path, movie.title, movie.overview);
    const carouselIndicator = new Template().carouselIndicator(index);

    // GET carousel element
    const carousel = document.querySelector('#moviesCarousel');

    // Appends HTML
    carousel.querySelector('.carousel-inner').append(carouselItem);
    carousel.querySelector('.carousel-indicators').append(carouselIndicator);
};

export const addMoviesToCarousel = async (movies) => {
    // Map works here but forEach doesn't because map returns an iterable, while forEach returns nought
    await Promise.all(movies.map(addCarouselItem)).then(() => {
        // eslint-disable-next-line no-new
        new Carousel(document.querySelector('#moviesCarousel'), {
            interval: 0,
        });
    });
};

export const loadCarousel = async () => {
    // Gets templates
    const carousel = new Template().carousel();

    // Gets carousel container
    const carouselContainer = document.querySelector('.carousel-container');

    // Appends HTML
    carouselContainer.append(carousel);

    // Gets movie title to search then inserts the return into the carousel
    const movieTitle = document.querySelector('#movie-title-input').value;
    new Connection().getMovies(movieTitle).then((movies) => {
        addMoviesToCarousel(movies);
    });
};
