document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add('container');
    
    body.appendChild(container);

    for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        container.appendChild(cell);
    }

    const cells = document.querySelectorAll('.cell');

    function getRandomInt() {
        return Math.floor(Math.random() * 15);
    }

    const position = getRandomInt();
    cells[position].classList.add('cell-active');

    setInterval(() => {
        const cellActive = document.querySelector('.cell-active');
        cellActive.classList.remove('cell-active');
        const newPosition = getRandomInt();
        cells[newPosition].classList.add('cell-active');
    }, 2000)
})