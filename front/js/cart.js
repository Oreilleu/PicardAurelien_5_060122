let getSection = document.getElementById('cart__items');

function getCart() {
    let cart = localStorage.getItem('Cart');
    cart
    for(let i = 0; i < cart.length; i++){
        console.log(i)
    }
}


function createDiv () {
    return document.createElement('div');
}

function createParagraph () {
    return document.createElement('p');
}

function createArticleForSection() {
    let article =  document.createElement('article');
    article.setAttribute('class', 'cart__item');
    article.setAttribute('data-id', '');
    article.setAttribute('data-color', '');
    getSection.appendChild(article);

    let divCartItemImg = createDiv();
    divCartItemImg.setAttribute('class', 'cart__item__img')
    article.appendChild(divCartItemImg);

    let img = document.createElement('img');
    img.setAttribute('src' , '');
    img.setAttribute('alt', '');
    divCartItemImg.appendChild(img);

    let divCartItemContent = createDiv();
    divCartItemContent.setAttribute('class', 'cart__item__content');
    article.appendChild(divCartItemContent);

    let divCartItemContentDescription = createDiv();
    divCartItemContentDescription.setAttribute('class', 'cart__item__content__description');
    divCartItemContent.appendChild(divCartItemContentDescription);

    let nameProduct = document.createElement('h2');
    nameProduct.innerText = 'Nom du produit';
    divCartItemContentDescription.appendChild(nameProduct);

    let colorProduct = createParagraph();
    colorProduct.innerText = 'Vert';
    divCartItemContentDescription.appendChild(colorProduct);
    
    let priceProduct = createParagraph();
    priceProduct.innerText = 'Vert';
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
    inputForQuantityProduct.setAttribute('value', '42');
    divCartItemContentSettingsQuantity.appendChild(inputForQuantityProduct);

    let divCartItemContentSettingsDelete = createDiv();
    divCartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');
    divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete);

    let deleteProduct = createParagraph();
    deleteProduct.setAttribute('class', 'deleteItem');
    deleteProduct.innerText = 'Supprimer';
    divCartItemContentSettingsDelete.appendChild(deleteProduct);

}
createArticleForSection()

{/* <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article> */}