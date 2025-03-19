document.addEventListener('DOMContentLoaded', () => {
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