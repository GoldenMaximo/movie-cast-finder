// // eslint-disable-next-line no-unused-vars
// const fadeOut = () => {
//     const s = document.getElementById('thing').style;
//     s.opacity = 1;
//     // eslint-disable-next-line no-cond-assign, no-unused-expressions
//     (function fade() { (s.opacity -= 0.1) < 0 ? s.display = 'none' : setTimeout(fade, 40); }());
// };

// old ver. w/o es6 class syntax - before webpack
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

// const getMovieCast = () => {
//     const movieTitle = document.querySelector('#movie-title-input').value;
//     new Connection().getMovies(movieTitle).then((movie) => {
//         new Connection().getCast(movie.id).then(() => {
//             // console.log(cast);
//         });
//     });
// };

// from the inside of Connection, html getting method before webpack
// async getHTMLTemplate(templateName) {
//     return fetch(`${this.templatePath}/${templateName}.txt`)
//         .then(response => response.text())
//         .then(template => template)
//         .catch(error => error);
// }
