import 'bootstrap-css-only';
import './css/index.scss';
import { loadCarousel, destroyCarousel } from './js/carouselFunctions';
import { startPageTitle } from './js/animations';

// DOM Listeners
(document.onreadystatechange = () => {
    if (document.readyState === 'interactive') {
        // Sets title and title keyframes for the page
        startPageTitle();

        document.querySelector('#movieForm').addEventListener('submit', (event) => {
            // Prevents submit
            event.preventDefault();

            // Self-explanatory I hope
            destroyCarousel();
            loadCarousel();
        });
    }
})();
