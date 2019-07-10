// import bsn from 'framework/bootstrap-native/bootstrap-native-v4';
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
            hideCarousel();
            destroyCarousel();
            loadCarousel();
            showCarousel();
        });
    }
})();
