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

// old ver
// export const addCarouselItem = async (movie, index) => {
//     // GET templates
//     const itemTemplate = await new Connection().getHTMLTemplate('carousel-item-template');
//     const indicatorTemplate = await new Connection().getHTMLTemplate('carousel-indicator-template');

//     // GET carousel element + creates tempalate initializer
//     const carousel = document.querySelector('#moviesCarousel');
//     const templateInitializer = document.createElement('html');

//     // Initilizes itemTemplate
//     templateInitializer.innerHTML = itemTemplate;
//     templateInitializer.querySelector('.carousel-item img').src += movie.poster_path;
//     templateInitializer.querySelector('.carousel-item h5').innerText = movie.title;
//     templateInitializer.querySelector('.carousel-item p').innerText = movie.overview;
//     const carouselItem = templateInitializer.querySelector('.carousel-item');

//     // Initilizes indicatorTemplate
//     templateInitializer.innerHTML = indicatorTemplate;
//     templateInitializer.querySelector('li').dataset.slideTo = index;
//     const carouselIndicator = templateInitializer.querySelector('li');

//     // Appends HTML
//     carousel.querySelector('.carousel-inner').append(carouselItem);
//     carousel.querySelector('.carousel-indicators').append(carouselIndicator);
// };

export const addMoviesToCarousel = async (movies) => {
    // map works here but forEach doesn't because map returns an iterable of promises, while forEach returns nought
    await Promise.all(movies.map(addCarouselItem)).then(() => {
        // eslint-disable-next-line no-new
        new Carousel(document.querySelector('#moviesCarousel'), {
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

export const loadCarousel = async () => {
    // Gets templates
    const carousel = new Template().carousel();

    // Gets carousel container + creates tempalate initializer
    const carouselContainer = document.querySelector('.carousel-container');

    // Appends HTML
    carouselContainer.append(carousel);

    // Gets movie title
    const movieTitle = document.querySelector('#movie-title-input').value;
    new Connection().getMovies(movieTitle).then((movies) => {
        addMoviesToCarousel(movies);
    });
};
