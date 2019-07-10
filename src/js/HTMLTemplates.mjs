export class Template {
    constructor() {
        this.templateInitializer = document.createElement('html');
    }

    carouselItem(moviePosterPath, movieTitle, movieOverview) {
        this.templateInitializer.innerHTML = `<div class="carousel-item">
        <img src="https://image.tmdb.org/t/p/w500${moviePosterPath}" class="d-block movie-poster" alt="movie-poster">
            <div class="carousel-caption d-block d-md-block shadow dark-text-shadow">
                <h5 class="movie-title">${movieTitle}</h5>
                <p class="movie-description">${movieOverview}</p>
            </div>
        </div>`;

        return this.templateInitializer.querySelector('.carousel-item');
    }

    carouselIndicator(index) {
        this.templateInitializer.innerHTML = `<li data-target="#moviesCarousel" data-slide-to="${index}"></li>`;
        return this.templateInitializer.querySelector('li');
    }

    carousel() {
        this.templateInitializer.innerHTML = `<div id="moviesCarousel" class="carousel slide justify-content-center" data-ride="carousel">
            <ol class="carousel-indicators">
            </ol>
            <div class="carousel-header p-3">
                <h3>Which one do you mean tho?</h3>
            </div>
            <hr>
            <div class="carousel-inner">
            </div>
            <a class="carousel-control-prev" href="#moviesCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#moviesCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>`;

        return this.templateInitializer.querySelector('#moviesCarousel');
    }
}

export default Template;
