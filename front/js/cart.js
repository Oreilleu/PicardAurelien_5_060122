function getCartOnCartPage() {
    let cart = localStorage.getItem('Cart');
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function createDiv () {
    return document.createElement('div');
}

function createParagraph () {
    return document.createElement('p');
}


function createArticleForSection(id, color, quantity, image, name, price, alt) {
    let getSection = document.getElementById('cart__items');

    let article =  document.createElement('article');
    article.setAttribute('class', 'cart__item');
    article.setAttribute('data-id', id);
    article.setAttribute('data-color', color);
    getSection.appendChild(article);

    let divCartItemImg = createDiv();
    divCartItemImg.setAttribute('class', 'cart__item__img')
    article.appendChild(divCartItemImg);

    let img = document.createElement('img');
    img.setAttribute('src' , image);
    img.setAttribute('alt', alt);
    divCartItemImg.appendChild(img);

    let divCartItemContent = createDiv();
    divCartItemContent.setAttribute('class', 'cart__item__content');
    article.appendChild(divCartItemContent);

    let divCartItemContentDescription = createDiv();
    divCartItemContentDescription.setAttribute('class', 'cart__item__content__description');
    divCartItemContent.appendChild(divCartItemContentDescription);

    let nameProduct = document.createElement('h2');
    nameProduct.innerText = name;
    divCartItemContentDescription.appendChild(nameProduct);

    let colorProduct = createParagraph();
    colorProduct.innerText = color;
    divCartItemContentDescription.appendChild(colorProduct);
    
    let priceProduct = createParagraph();
    priceProduct.innerText = price * quantity + ' €';
    divCartItemContentDescription.appendChild(priceProduct);

    let divCartItemContentSettings = createDiv();
    divCartItemContentSettings.setAttribute('class', 'cart__item__content__settings');
    divCartItemContent.appendChild(divCartItemContentSettings);

    let divCartItemContentSettingsQuantity = createDiv();
    divCartItemContentSettingsQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
    divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity);

    let quantityProduct = createParagraph();
    quantityProduct.innerText = 'Qté : ';
    divCartItemContentSettingsQuantity.appendChild(quantityProduct);

    let inputForQuantityProduct = document.createElement('input');
    inputForQuantityProduct.setAttribute('type', 'number');
    inputForQuantityProduct.setAttribute('class', 'itemQuantity');
    inputForQuantityProduct.setAttribute('name', 'itemQuantity');
    inputForQuantityProduct.setAttribute('min', '1');
    inputForQuantityProduct.setAttribute('max', '100');
    inputForQuantityProduct.setAttribute('value', quantity);
    inputForQuantityProduct.addEventListener('change', function(e) {
        priceProduct.innerText = price * e.target.value;
    })
    divCartItemContentSettingsQuantity.appendChild(inputForQuantityProduct);

    let divCartItemContentSettingsDelete = createDiv();
    divCartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');
    divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);

    let deleteProduct = createParagraph();
    deleteProduct.setAttribute('class', 'deleteItem');
    deleteProduct.innerText = 'Supprimer';
    divCartItemContentSettingsDelete.appendChild(deleteProduct);

}

function contentCart() {
    let array = getCartOnCartPage();
    console.log(array)
    for(let i = 0; i < array.length; i++) {
        createArticleForSection(array[i].id, array[i].color, array[i].quantity, array[i].img, array[i].name, array[i].price, array[i].alt)
    }
}
contentCart()