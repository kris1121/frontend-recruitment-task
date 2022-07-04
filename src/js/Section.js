import { createModal, onClickHandler } from './Modal';

const createContainer = () => {
    const container = document.createElement("div");

    return container;  
}

const createImage = (alt, title, desktop_img, mobile_img) => {

    const img = new Image();
    
    const img1 = document.createElement('img');
    const img2 = document.createElement('img');

    img1.src = desktop_img;
    img2.src = mobile_img;

    alt ? img.alt = alt : img.alt = "";
    title ? img.title = title : "";

    img.srcset = `${mobile_img} 480w, ${desktop_img} 784w`;
    img.sizes = `(max-width: 1000px) 480px, 784px`;
    img.src = mobile_img;

    return img;
}

const createTitle = (text, class_name) => {
    const title = document.createElement('h1');

    title.setAttribute('aria-description', 'Nagłówek')
    title.innerText = text ? text : "";
    title.classList.add(`${class_name}__title`)

    return title;
}

const createContentText = (text, class_name) => {
    const content = document.createElement("p");

    content.setAttribute('aria-description', 'Zawartość paragrafu')
    content.innerText = text ? text : "";
    content.classList.add(`${class_name}__content`)

    return content;
}

const createButton = (class_name) => {
    const button = document.createElement("button");
    button.innerText = "Button";
    button.classList.add(`${class_name}__button`);
    button.setAttribute('data-micromodal-trigger', true)
    button.setAttribute('aria-description', 'kliknij przycisk by otworzyć popup');
    button.addEventListener('click', () => onClickHandler())

    return button;
}

//function create section
//@param class_name of created section
//@param title to section
//@param content to section
//@param img_alt
//@param img_title

export const createSection = (class_name, title, content, img_alt, img_title, desktop_img, mobile_img) => {
    const section = document.createElement("section");
    section.classList.add(class_name);
    

    //create left container
    const left_container = createContainer();
    left_container.classList.add(`${class_name}__left_container`);
   
    const img = createImage(img_alt, img_title, desktop_img, mobile_img);

    //create right container

    const right_container = createContainer();
    right_container.classList.add(`${class_name}__right_container`);

    const header = title ? createTitle(title, class_name) : createTitle("", class_name);
    const text = content ? createContentText(content, class_name) : createContentText("", class_name);
    const button = createButton(class_name);

    left_container.appendChild(img);
    right_container.appendChild(header);
    right_container.appendChild(text);
    right_container.appendChild(button);


    section.appendChild(left_container);
    section.appendChild(right_container);

    const isModalPresent = document.querySelector('.modal');
    if (!isModalPresent) {
        document.body.appendChild(createModal());
    }

    return section;
}


