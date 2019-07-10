import 'bootstrap-css-only';
import './css/index.scss';
import {
    showCarousel, hideCarousel, loadCarousel, destroyCarousel,
} from './js/carouselFunctions';

// DOM Listeners
(document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        document.querySelector('#movieForm').addEventListener('submit', (event) => {
            // Prevents submit
            event.preventDefault();

            // Self-explanatory I hope
            hideCarousel();
            destroyCarousel();
            loadCarousel();
            showCarousel();
        });
    }
})();
