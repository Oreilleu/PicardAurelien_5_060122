// Creat all the Element for the section in HTML
function getSectionAndAddIn(id, color, image, alt, name, color, price, quantity){
    let getSection = document.getElementById('cart__items');
    appendToElement(createArticleWithAtribute(id, color, image, alt, name, color, price, quantity), getSection);
}

function createArticleWithAtribute(id, color, image, alt, name, color, price, quantity) {
    let article =  document.createElement('article');
    article.setAttribute('class', 'cart__item');
    article.setAttribute('data-id', id);
    article.setAttribute('data-color', color);

    appendToElement(createBlocDivImg(image, alt), article);
    appendToElement(createDivContent(name, color, price, quantity), article);

    return article;
}

function createBlocDivImg(image, alt) {
    let divCartItemImg = document.createElement('div');
    divCartItemImg.setAttribute('class', 'cart__item__img');

    let img = document.createElement('img');
    img.setAttribute('src' , image);
    img.setAttribute('alt', alt);
    divCartItemImg.appendChild(img);

    return divCartItemImg;
}

function createDivContent(name, color, price, quantity) {
    let divCartItemContent = document.createElement('div');
    divCartItemContent.setAttribute('class', 'cart__item__content');

    appendToElement(createBlocDivDescription(name, color, price, quantity), divCartItemContent);
    appendToElement(createDivSettings(quantity), divCartItemContent);

    return divCartItemContent;
}

function createBlocDivDescription(name, color, price, quantity) {
    let divCartItemContentDescription = document.createElement('div');
    divCartItemContentDescription.setAttribute('class', 'cart__item__content__description');

    let nameProduct = document.createElement('h2');
    nameProduct.innerText = name;
    divCartItemContentDescription.appendChild(nameProduct);

    let colorProduct = document.createElement('p');
    colorProduct.innerText = color;
    divCartItemContentDescription.appendChild(colorProduct);

    let priceProduct = document.createElement('p');
    priceProduct.innerText = price * quantity + ' €';
    divCartItemContentDescription.appendChild(priceProduct);

    return divCartItemContentDescription;
}

function createDivSettings(quantity) {
    let divCartItemContentSettings = document.createElement('div');
    divCartItemContentSettings.setAttribute('class', 'cart__item__content__settings');

    appendToElement(createBlocDivSettingsQuantity(quantity), divCartItemContentSettings);
    appendToElement(createBlocDivSettingsDelete(), divCartItemContentSettings);

    return divCartItemContentSettings;
}

// Finir la functio addEventListener
function createBlocDivSettingsQuantity(quantity) {
    let divCartItemContentSettingsQuantity = document.createElement('div');
    divCartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');

    let quantityProduct = document.createElement('p');
    quantityProduct.innerText = 'Qté : ';
    divCartItemContentSettingsQuantity.appendChild(quantityProduct);

    let inputForQuantityProduct = document.createElement('input');
    inputForQuantityProduct.setAttribute('type', 'number');
    inputForQuantityProduct.setAttribute('class', 'itemQuantity');
    inputForQuantityProduct.setAttribute('name', 'itemQuantity');
    inputForQuantityProduct.setAttribute('min', '1');
    inputForQuantityProduct.setAttribute('max', '100');
    inputForQuantityProduct.setAttribute('value', quantity);
    divCartItemContentSettingsQuantity.appendChild(inputForQuantityProduct);

    return divCartItemContentSettingsQuantity;
}

function createBlocDivSettingsDelete() {
    let divCartItemContentSettingsDelete = document.createElement('div');
    divCartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');

    let deleteProduct = document.createElement('p');
    deleteProduct.setAttribute('class', 'deleteItem');
    deleteProduct.innerText = 'Supprimer';
    divCartItemContentSettingsDelete.appendChild(deleteProduct);

    return divCartItemContentSettingsDelete;
}

function appendToElement(child, parent) {
    let getFunction = child;
    parent.appendChild(getFunction);
}

// Create function that get the Array in the storage
function getArrayStorage() {
    let basket = localStorage.getItem('Cart');
    if(basket != null) {
        return JSON.parse(basket);
    }
}
// Create function who show the products in cart page

function saveCart(basket) {
    localStorage.setItem('Cart', JSON.stringify(basket));
}

// Use LocalStorage for introduce data while the creation of the item
function showProduct() {
    let basket = getArrayStorage();
    for(let i = 0; i < basket.length; i++) {
        getSectionAndAddIn(basket[i].id, basket[i].color, basket[i].img, basket[i].alt, basket[i].name, basket[i].color, basket[i].price, basket[i].quantity)
    }
}

// Change the quantity in the LocalStorage when the Input change on the page
function changeQuantityInStorage() {
    let getInput = document.querySelectorAll('.cart__item__content__settings__quantity input')
    let basket = getArrayStorage();
    for(let j = 0; j < getInput.length; j++) {
        getInput[j].addEventListener('change', (e) => {
            let getChangeId = basket[j].id;
            let getChangeColor = basket[j].color;
            let foundProduct = basket.find(p => p.id == getChangeId && p.color == getChangeColor);
            if(foundProduct != undefined) {
                foundProduct.quantity = e.target.value;
                saveCart(basket);
                location.reload();
            }
        })
    }

}

showProduct()
changeQuantityInStorage()

// Make an function who manage delete of the product
let deleteProduct = document.querySelectorAll('.deleteItem');
let bask = getArrayStorage();
for (let m = 0; m < deleteProduct.length; m++) {
    deleteProduct[m].addEventListener('click', () => {
        // event.preventDefault();
        let getChangeId = bask[m].id;
        let getChangeColor = bask[m].color;
        // let foundProduct = bask.find(p => p.id == getChangeId && p.color == getChangeColor);
        // if(foundProduct != undefined){
        //     bask.filter(p => p.id != getChangeId && p.color != getChangeColor)
        // }
        bask = bask.filter(p => p.id !== getChangeId && p.color !== getChangeColor)
        saveCart(bask)
    })
}




/**
 * See with Yazid if reload the page is ok for the price on the cart page 
 * or if i have to make a function who manage this 
*/