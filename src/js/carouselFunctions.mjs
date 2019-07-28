import { Connection } from './connections';
import { Template } from './HTMLTemplates';
import { showNotFoundMessage } from './customAnimations';

const showCarousel = async () => {
    // Doesn't work:

    const carousel = document.querySelector('.movies-carousel');
    carousel.classList.add('bounceInDown');

    const handleAnimationEnd = () => {
        carousel.classList.remove('bounceInDown');
        carousel.style.display = 'block';
        carousel.scrollIntoView({ behavior: 'smooth' });
        carousel.removeEventListener('animationend', handleAnimationEnd());
    };

    carousel.addEventListener('animationend', handleAnimationEnd());


    // Works with timeouts:

    // if ([...document.querySelector('.movies-carousel').classList].includes('bounceOutDown')) {
    //     document.querySelector('.movies-carousel').classList.remove('bounceOutDown');
    //     setTimeout(() => {
    //         document.querySelector('.movies-carousel').classList.add('bounceInDown');
    //         document.querySelector('.movies-carousel').style.display = 'block';
    //     }, 500);
    // } else {
    //     document.querySelector('.movies-carousel').classList.add('bounceInDown');
    //     document.querySelector('.movies-carousel').style.display = 'block';
    //     setTimeout(() => {
    //         document.querySelector('.movies-carousel').scrollIntoView({
    //             behavior: 'smooth',
    //         });
    //     }, 500);
    // }


    // Previous attempt
    // await new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(document.querySelector('.movies-carousel').classList.add('fadeInDown'));
    //     }, 100);
    // }).then(() => {
    // });
};

const hideCarousel = () => {
    const carousel = document.querySelector('.movies-carousel');
    carousel.classList.add('bounceOutDown');

    function handleAnimationEnd() {
        carousel.classList.remove('bounceOutDown');
        carousel.style.display = 'none';
        carousel.removeEventListener('animationend', handleAnimationEnd);
    }

    carousel.addEventListener('animationend', handleAnimationEnd());
};

const destroyCarousel = () => {
    if (document.querySelector('.movies-carousel').style.display === 'block') {
        hideCarousel();
    }
    document.querySelector('.carousel-container').innerHTML = '';
};

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

const loadCarousel = async () => {
    // Destroy previous Carousel
    destroyCarousel();

    // Gets new Carousel template
    const carousel = new Template().carousel();

    // Gets Carousel container
    const carouselContainer = document.querySelector('.carousel-container');

    // Appends template to the container
    carouselContainer.append(carousel);

    // Searches movie title then inserts the result into the Carousel template
    const movieTitle = document.querySelector('#movie-title-input').value;
    new Connection().getMovies(movieTitle).then((movies) => {
        if (movies) {
            addMoviesToCarousel(movies);
            showCarousel();
        } else {
            showNotFoundMessage();
        }
    });
};

export default loadCarousel;
