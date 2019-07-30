import { Connection } from './connections';
import { Template } from './HTMLTemplates';
import { showNotFoundMessage } from './customAnimations';

const showCarousel = async (carouselRow) => {
    const handleShowAnimationEnd = () => {
        carouselRow.classList.remove('bounceInUp');
        carouselRow.scrollIntoView({ behavior: 'smooth' });
        carouselRow.removeEventListener('animationend', handleShowAnimationEnd);
    };

    carouselRow.style.display = 'block';
    carouselRow.addEventListener('animationend', () => {
        handleShowAnimationEnd();
    });
    carouselRow.classList.add('bounceInUp');
};

const destroyCarousel = (carouselRow => new Promise((resolve) => {
    // Destroys Carousel
    const emptyCarouselContainer = () => {
        carouselRow.querySelector('.carousel-container').innerHTML = '';
    };

    // Hides the Carousel if it's visible
    if (carouselRow.style.display === 'block') {
        const handleHideAnimationEnd = () => {
            carouselRow.classList.remove('bounceOutDown');
            carouselRow.removeEventListener('animationend', handleHideAnimationEnd);
            emptyCarouselContainer();
            resolve();
        };

        carouselRow.classList.add('bounceOutDown');
        carouselRow.addEventListener('animationend', () => {
            handleHideAnimationEnd();
        });
    } else {
        emptyCarouselContainer();
        resolve();
    }
}));

const addCarouselItem = async (movie, index) => {
    // GET templates
    const carouselItem = new Template().carouselItem(movie.poster_path, movie.title, movie.overview);
    const carouselIndicator = new Template().carouselIndicator(index);

    // GET carousel element
    const carousel = document.querySelector('#moviesCarousel');

    // Appends HTML
    carousel.querySelector('.carousel-inner').append(carouselItem);
    carousel.querySelector('.carousel-indicators').append(carouselIndicator);
};

const addMoviesToCarousel = async (movies) => {
    // Map works here but forEach doesn't because map returns an iterable, while forEach returns nought
    await Promise.all(movies.map(addCarouselItem)).then(() => {
        // eslint-disable-next-line no-new, no-undef
        new Carousel(document.querySelector('#moviesCarousel'), {
            interval: 0,
        });
    });
};

const loadCarousel = () => {
    // Declares Carousel node elements
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselRow = document.querySelector('.movies-carousel-row');
    const carousel = document.querySelector('#moviesCarousel');

    // Destroys the Carousel
    destroyCarousel(carouselRow, carousel).then(() => {
        // Gets new Carousel template
        const carouselTemplate = new Template().carousel();

        // Appends template to the container
        carouselContainer.append(carouselTemplate);

        // Searches movie title then inserts the result into the Carousel template
        const movieTitle = document.querySelector('#movie-title-input').value;
        new Connection().getMovies(movieTitle).then((movies) => {
            if (movies) {
                addMoviesToCarousel(movies);
                showCarousel(carouselRow);
            } else {
                showNotFoundMessage();
            }
        });
    });
};

export default loadCarousel;
