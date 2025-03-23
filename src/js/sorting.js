import data from './data.json'

document.addEventListener("DOMContentLoaded", () => {
    const dataAttributes = ['id', 'title', 'year', 'imdb'];
    const body = document.querySelector('body');

    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const tableBody = document.createElement('tbody');


    const id = document.createElement('td');
    id.textContent = 'id';
    const title = document.createElement('td');
    title.textContent = 'title';
    const year = document.createElement('td');
    year.textContent = 'year';
    const imdb = document.createElement('td');
    imdb.textContent = 'imdb';


    table.insertAdjacentElement('afterbegin', tableHeader)
    table.insertAdjacentElement('beforeend', tableBody)

    tableHeader.insertAdjacentElement('beforeend', id)
    tableHeader.insertAdjacentElement('beforeend', title)
    tableHeader.insertAdjacentElement('beforeend', year)
    tableHeader.insertAdjacentElement('beforeend', imdb)

    body.insertAdjacentElement('beforeend', table)

    function rednerTable(data) {
        tableBody.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            const row = document.createElement('tr');
            row.dataset.id = data[i].id;
            row.dataset.title = data[i].title;
            row.dataset.year = data[i].year;
            row.dataset.imdb = data[i].imdb;

            const idElem = document.createElement('td');
            idElem.textContent = data[i].id;
            const idTitle = document.createElement('td');
            idTitle.textContent = data[i].title;
            const idYear = document.createElement('td');
            idYear.textContent = `(${data[i].year})`;
            const idImdb = document.createElement('td');
            idImdb.textContent = `imbd: ${data[i].imdb.toFixed(2)}`;

            row.append(idElem, idTitle, idYear, idImdb)

            tableBody.appendChild(row)
        }
    }

    rednerTable(data)

    const rows = Array.from(document.querySelectorAll('tr'));
    let sortIndex = 0
    let ascending = true;


    function updateHeaders() {
        Array.from(tableHeader.children).forEach((header, index) => {
            header.textContent = dataAttributes[index];
        })

        const arrow = ascending ? ' ↑' : ' ↓';
        tableHeader.childNodes[sortIndex].textContent += arrow;
    }



    setInterval(() => {
        const key = dataAttributes[sortIndex]
        
        const sortedRows = rows.sort((a, b) => {
            let aValue = a.dataset[key];
            let bValue = b.dataset[key];

            if (key === 'id' || key === 'year' || key === "imdb") {
                aValue = parseFloat(aValue);
                bValue = parseFloat(bValue);
                return ascending ? aValue - bValue : bValue - aValue;
            } else {
                return ascending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }
        });
        tableBody.innerHTML = '';
        sortedRows.forEach(row => {
            tableBody.appendChild(row);
        })
        updateHeaders()
        ascending = !ascending;
        if (!ascending) sortIndex = (sortIndex + 1) % dataAttributes.length
    }, 2000)
})
