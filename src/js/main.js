
//constants
const title = "Lorem ipsum";
const text = "Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required."
const desktop_img = "./dist/img/desktop.webp";
const mobile_img = "./dist/img/mobile.webp";
const url = "https://jsonplaceholder.typicode.com/users";


const module = createSection("module", title, text, "alternatywny tekst", "tytuł obrazka", desktop_img, mobile_img);

document.body.appendChild(module);



