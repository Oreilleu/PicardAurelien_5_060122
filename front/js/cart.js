let cart = document.getElementById('cart__items');

let article = document.createElement('article');
article.setAttribute('class', 'cart__item');
article.setAttribute('data-id', localStorage.getItem('id')) ;
article.setAttribute('data-color', localStorage.getItem('color')); // Mettre la couleur selectionner sur page products
cart.appendChild(article);

let firstDiv = document.createElement('div');
firstDiv.setAttribute('class', 'cart__item_img');
firstDiv.style.width = '25%';
        
article.appendChild(firstDiv);
let img = document.createElement('img');
img.setAttribute('src', localStorage.getItem('img'));
img.setAttribute('alt', localStorage.getItem('alt'));
img.style.width = '100%';
img.style.borderRadius = '25px';
img.style.height = '219.91px'
img.style.objectFit = 'cover';
        // Reste a gérer le responsive pour que l'image prenne environ 230 de width
        
firstDiv.appendChild(img);

let secondDiv = document.createElement('div');
secondDiv.setAttribute('class', 'cart__items__content');
secondDiv.style.width = '50%';
article.appendChild(secondDiv);

let firstUnderDiv = document.createElement('div');
firstUnderDiv.setAttribute('class', 'cart__item__content__description');
secondDiv.appendChild(firstUnderDiv);
let titleTwo = document.createElement('h2');
titleTwo.innerText = localStorage.getItem('title');
firstUnderDiv.appendChild(titleTwo);
let firstP = document.createElement('p');
firstP.innerText = localStorage.getItem('color'); // METTRE DATA CHOIX COULEUR PAGE PRODUCTS
firstUnderDiv.appendChild(firstP);
let secondP = document.createElement('p');
secondP.innerText = localStorage.getItem('price') + ' €'; // PRICE = CHOIX QTE * DATA.PRICE
firstUnderDiv.appendChild(secondP);

let secondUnderDiv = document.createElement('div');
secondUnderDiv.setAttribute('class', 'cart__item__content__settings');
secondDiv.appendChild(secondUnderDiv);

let thirdUnderDiv = document.createElement('div');
thirdUnderDiv.setAttribute('class', 'cart__item__content__settings__quantity');
secondUnderDiv.appendChild(thirdUnderDiv);

let thirdP = document.createElement('p');
thirdP.innerText = 'Qté :';
thirdUnderDiv.appendChild(thirdP);
let input = document.createElement('input');
input.setAttribute('type', 'number');
input.setAttribute('class', 'itemQuantity');
input.setAttribute('name', 'itemQuantity');
input.setAttribute('min', '1');
input.setAttribute('max', '100');
input.setAttribute('value', '42');
thirdUnderDiv.appendChild(input);

let fourthUnderDiv = document.createElement('div');
fourthUnderDiv.setAttribute('class', 'cart__item__content__settings__delete');
secondUnderDiv.appendChild(fourthUnderDiv);

let fourthP = document.createElement('p');
fourthP.setAttribute('class', 'deleteItem');
fourthP.innerText = 'Supprimer';
fourthUnderDiv.appendChild(fourthP);