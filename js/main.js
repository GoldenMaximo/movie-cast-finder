const apiKey = 'e5eee0efae5b0226ec8670bdf1fd1380';
const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`;
const imgUrl = 'http://image.tmdb.org/t/p/w300/';
const peopleUrl = 'https://api.themoviedb.org/3/person/';
const castUrl = 'https://api.themoviedb.org/3/movie';

const fetchMovieData = (movieTitle => new Promise((resolve, reject) => {
    fetch(apiUrl + movieTitle).then(response => response.json()).then((data) => {
        resolve(data.results);
    }).catch((error) => {
        reject(error);
    });
}));

const getCast = (movie => new Promise((resolve, reject) => {
    fetch(peopleUrl + movie.id).then(response => response.json()).then((data) => {
        resolve(data);
    }).catch((error) => {
        // console.log(`failed to fetch em bitches ${error}`);
        reject(error);
    });
}));

const doStuff = () => {
    const movieTitle = document.querySelector('#movie-title').value;
    fetchMovieData(movieTitle).then((movieData) => {
        getCast(movieData[0]).then((cast) => {
            console.log(cast);
        });
    });
};

document.querySelector('#movieForm').addEventListener('submit', (event) => {
    event.preventDefault();
    doStuff();
});

//
//
//
//
// Bitch ass code
// document.querySelector('#movieForm').addEventListener('submit', (event) => {
//     event.preventDefault();
//     const movieTitleInputs = Array.from(document.querySelectorAll('.movie-title'));
//     const moviePromises = movieTitleInputs.map(movieTitleInput => fetchMovieData(movieTitleInput.value));
//     Promise.all(moviePromises).then((promiseData) => {
//         promiseData.forEach((element) => {
//             document.querySelector('#movies').innerHTML += `<img src="${imgUrl}${element[0].poster_path}">`;
//         });
//     });
// });
