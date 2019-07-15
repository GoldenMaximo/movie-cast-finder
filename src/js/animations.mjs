export const startPageTitle = () => {
    const text = 'Movie Cast Finder';

    Object.values(text).forEach((element) => {
        if (element === ' ') {
            document.querySelector('.wavetext').innerHTML += '<span>&nbsp;</span>';
        } else {
            document.querySelector('.wavetext').innerHTML += `<span>${element}</span>`;
        }
    });
};

export const showNotFoundMessage = () => {
    document.querySelector('.no-hits img').classList.add('fade-in-circular-rotation');
};

export const hideNotFoundMessage = () => {
    document.querySelector('.no-hits img').classList.add('fade-in-circular-rotation');
};
