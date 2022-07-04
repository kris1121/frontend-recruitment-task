import MicroModal from "micromodal";

import { addLoaderToDOM, removeTableFromDOM, replaceLoaderByTable } from "./Table";

export const createModal = () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute('id', 'modal-1');
    modal.setAttribute('aria-hidden', true);

    const modal_overlay = document.createElement('div');
    modal_overlay.classList.add('modal__overlay');
    modal_overlay.setAttribute('tabindex', -1);
    modal_overlay.setAttribute('data-micromodal-close', "modal-1");

    const modal_container = document.createElement('div');
    modal_container.classList.add('modal__container');
    modal_container.setAttribute('role', 'dialog');
    modal_container.setAttribute('aria-modal', true);
    modal_container.setAttribute('aria-labelledby', 'modal-1-title');

    const button_close = document.createElement('img');
    button_close.classList.add('modal__close');
    button_close.setAttribute('aria-label', 'Close modal');
    button_close.setAttribute('data-micromodal-close', true);
    button_close.src = './dist/img/x-icon.png';
    button_close.alt = "close popup"

    const header = document.createElement('header');

    const h2 = document.createElement('h2');
    h2.classList.add('modal__title');
    h2.setAttribute('id', 'modal-1-title');
    h2.innerText = 'Alert!';

    const content = document.createElement('div');
    content.classList.add('modal__content');
    content.setAttribute('id', 'modal-1-content');

    const button_clear = document.createElement('button');
    button_clear.classList.add('modal__clear');

    header.appendChild(h2);
    modal_container.appendChild(button_close);
    modal_container.appendChild(header);
    modal_container.appendChild(content);
    modal_container.appendChild(button_clear);
    button_clear.innerText = "Wyzeruj licznik"
    modal_overlay.appendChild(modal_container);
    modal.appendChild(modal_overlay);

    return modal;
}

const clearButtonHandler = () => {
    localStorage.setItem('numberOfClicks', 0);
    let content = document.querySelector('.modal__content');
    content.innerHTML = `You have clicked <span>${localStorage.getItem('numberOfClicks')} times</span> to related button.`;
}


const checkAndWriteClickToLocalStorage = () => {
    let current_number = localStorage.getItem('numberOfClicks');
    let content = document.querySelector('.modal__content');
    const button_clear = document.querySelector('.modal__clear');
    button_clear.classList.add('hidden');


    if (!current_number || Number(current_number) === 0) {
        localStorage.setItem('numberOfClicks', 1);
        content.innerHTML = `You have clicked <span>1 time</span> to related button.`;
    } else {
        current_number++;
        localStorage.setItem('numberOfClicks', current_number);
        content.innerHTML = `You have clicked <span>${current_number} times</span> to related button.`;
    }
    
    if (Number(current_number) >= 5) {
        button_clear.classList.remove('hidden');
        button_clear.addEventListener('click', () => clearButtonHandler());
    }
}

export const onClickHandler = () => {
    MicroModal.show('modal-1');
    checkAndWriteClickToLocalStorage();
    removeTableFromDOM();
    addLoaderToDOM();
    replaceLoaderByTable();
}