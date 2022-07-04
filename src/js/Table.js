import { getDataFromEndpoint } from "./endpoint";

const createTable = (data) => {

    const table = document.createElement('table');
    table.className = "modal__table"
    const thaed = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thaed.innerHTML =
        `
        <tr>
            <th>
                Imię i nazwisko
            </th>
            <th>
                Email
            </th>
            <th>
                Adres
            </th>
            <th>
                Telefon
            </th>
            <th>
                Nazwa firmy
            </th>
        </tr>
        `

    data.map(row => {
        const line = document.createElement('tr');
        line.innerHTML =
        `<tr>
            <td>${row?.name}</td>
            <td>${row?.email}</td>
            <td>${row?.address?.city}, ${row?.address?.street}, ${row?.address?.suite}</td>
            <td>${row?.phone}</td>
            <td>${row?.company?.name}</td>
        </tr>`

        tbody.appendChild(line);
    });        
    
    table.appendChild(thaed);
    table.appendChild(tbody);

    return table;
}
 

const addTableToDOM = (table) => {
    const placeForTable = document.querySelector('.modal__container');
    placeForTable.appendChild(table);
}

export const replaceLoaderByTable = async () => {
    await getDataFromEndpoint()
        .then(res => createTable(res))
        .then(table => {
            const loader = document.querySelector('#loader');
            loader.remove();
            addTableToDOM(table);
        })
}

export const removeTableFromDOM = () => {
    const placeForTable = document.querySelector('.modal__container');
    const table = placeForTable.querySelector('.modal__table');
    table ? table.remove() : null;
}

export const addLoaderToDOM = () => {
    const placeForTable = document.querySelector('.modal__container');
    const loader = document.createElement('img');
    loader.src = "./dist/img/load-loading.gif";
    loader.setAttribute('id', 'loader');

    placeForTable.appendChild(loader)
}
