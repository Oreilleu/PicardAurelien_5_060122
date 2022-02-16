let locat = window.location.port;
let basket = getArrayStorage();

// Récupère la section cart__items et y ajoute un article
function getSectionAndAddIn(id, color, image, alt, name, color, quantity){
    let getSection = document.getElementById('cart__items');
    appendToElement(createArticleWithAtribute(id, color, image, alt, name, color, quantity), getSection);
}

// Return un article avec la div(image) et la div(contenu)
function createArticleWithAtribute(id, color, image, alt, name, color, quantity) {
    let article =  document.createElement('article');
    article.setAttribute('class', 'cart__item');
    article.setAttribute('data-id', id);
    article.setAttribute('data-color', color);

    appendToElement(createBlocDivImg(image, alt), article);
    appendToElement(createDivContent(name, color, id, quantity), article);

    return article;
}

// Return une div(image) avec une image créé
function createBlocDivImg(image, alt) {
    let divCartItemImg = document.createElement('div');
    divCartItemImg.setAttribute('class', 'cart__item__img');

    let img = document.createElement('img');
    img.setAttribute('src' , image);
    img.setAttribute('alt', alt);
    divCartItemImg.appendChild(img);

    return divCartItemImg;
}

// Return une div(contenu) avec la div(description) et la div(option)
function createDivContent(name, color, id, quantity) {
    let divCartItemContent = document.createElement('div');
    divCartItemContent.setAttribute('class', 'cart__item__content');

    appendToElement(createBlocDivDescription(name, color, id, quantity), divCartItemContent);
    appendToElement(createDivSettings(quantity), divCartItemContent);

    return divCartItemContent;
}

// Return une div(description) contenant un h2(name), un paragraphe(color) et un paragraphe(price)
function createBlocDivDescription(name, color, id, quantity) {
    let divCartItemContentDescription = document.createElement('div');
    divCartItemContentDescription.setAttribute('class', 'cart__item__content__description');

    let nameProduct = document.createElement('h2');
    nameProduct.innerText = name;
    divCartItemContentDescription.appendChild(nameProduct);

    let colorProduct = document.createElement('p');
    colorProduct.innerText = color;
    divCartItemContentDescription.appendChild(colorProduct);

    let priceProduct = document.createElement('p');
    getPrice(id, priceProduct, quantity)
    divCartItemContentDescription.appendChild(priceProduct);

    return divCartItemContentDescription;
}

// Return une div(option) contenant la div(quantité) et la div(supprimer)
function createDivSettings(quantity) {
    let divCartItemContentSettings = document.createElement('div');
    divCartItemContentSettings.setAttribute('class', 'cart__item__content__settings');

    appendToElement(createBlocDivSettingsQuantity(quantity), divCartItemContentSettings);
    appendToElement(createBlocDivSettingsDelete(), divCartItemContentSettings);

    return divCartItemContentSettings;
}

// Return une div avec un paragraphe(quantité) et son input
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

// Return une div(supprimer) avec le btn supprimer
function createBlocDivSettingsDelete() {
    let divCartItemContentSettingsDelete = document.createElement('div');
    divCartItemContentSettingsDelete.setAttribute('class', 'cart__item__content__settings__delete');

    let deleteProduct = document.createElement('p');
    deleteProduct.setAttribute('class', 'deleteItem');
    deleteProduct.innerText = 'Supprimer';
    divCartItemContentSettingsDelete.appendChild(deleteProduct);

    return divCartItemContentSettingsDelete;
}

// Permets d'ajouter un enfant a un élément
function appendToElement(child, parent) {
    let getFunction = child;
    parent.appendChild(getFunction);
}

/**
 * Récupère les produits de l'API 
 * SI l'id du produit de la page vaut l'id du produit de l'API
 * Inscrit le prix dans une variable(paragraphe(price)) en fonction de la quantité
 */
function getPrice(item, varPrice, quantity) {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            if(item == data[i]._id) {
                varPrice.innerText = data[i].price * quantity;
            }
        }
    totalPrice();
    totalQuantity();
    })
    
}

// Fait la somme de tous les prix des produits présents sur la page et les inscrit dans la variable prix total
function totalPrice() {
    let price = document.querySelectorAll('.cart__item__content__description');
    let sum = 0;
    for(let i = 0; i < price.length; i++) {
        sum += parseInt(price[i].lastChild.innerText)
    }
    document
        .getElementById('totalPrice')
        .innerText = sum;

}

// Fait la somme de tous les inputs quantité présents sur la page et les inscrit dans la variable quantité total
function totalQuantity() {
    let input = document.querySelectorAll('.itemQuantity');
    let sum = 0;
    for(let i = 0; i < input.length; i++) {
        let parse = parseInt(input[i].value)
        sum += parse
    }
    document
        .getElementById('totalQuantity')
        .innerText = sum;
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------- */

// Crée la clé Cart dans le localStorage et y enverra un objet
function saveCart(basket) {
    localStorage.setItem('Cart', JSON.stringify(basket));
}

// Return le local storage à la clé Cart
function getArrayStorage() {
    let basket = localStorage.getItem('Cart');
    if(basket != null) {
        return JSON.parse(basket);
    } else {
        return false;
    }
}

// Apelle la fonction getSectionAndAddIn() pour ajouter chaque produit contenue dans le local storage sur la page
function showProduct() {
    for(let i = 0; i < basket.length; i++) {
        getSectionAndAddIn(basket[i].id, basket[i].color, basket[i].img, basket[i].alt, basket[i].name, basket[i].color, basket[i].quantity)
    }
}

/**
 * Récupère les inputs de la page 
 * Lorsque la valeur d'un input change j'identifie ce dernier pour modifier sa valeur dans le local storage
 */
function changeQuantityInStorage() {
    let getInput = document.querySelectorAll('.cart__item__content__settings__quantity input')
    for(let j = 0; j < getInput.length; j++) {
        getInput[j].addEventListener('change', (e) => {
            let getChangeId = basket[j].id;
            let getChangeColor = basket[j].color;
            let foundProduct = basket.find(p => p.id == getChangeId && p.color == getChangeColor);
            if(foundProduct != undefined) { 
                if(e.target.value == 0 || e.target.value == '') {
                    let change = getChangeId + getChangeColor;
                    basket = basket.filter(p => p.id + p.color != change);
                    saveCart(basket);
                    location.reload();
                } else if(e.target.value > 100) {
                    alert('Veuillez choisir une quantité inférieure à 100')
                } else {
                    foundProduct.quantity = e.target.value;
                    saveCart(basket);
                    location.reload();
                } 
            }
        })
    }

}

// Supprime un article lorsque le btn supprimer est cliquer
function deleteProduct() {
    let deleteProduct = document.querySelectorAll('.deleteItem');
    for (let m = 0; m < deleteProduct.length; m++) {
        deleteProduct[m].addEventListener('click', (e) => {
            let getChangeId = basket[m].id;
            let getChangeColor = basket[m].color;
            let change = getChangeId + getChangeColor;
            basket = basket.filter(p => p.id + p.color != change);
            saveCart(basket);
            location.reload();
        })
    }
}

/* ---------------------------------------------------------------------------------------------------------------------------------------------- */

// Test via regex pour les prénoms, nom de famille et ville
function validFirstAndLastNameAndCity(input, e) {
    let getFirstNameError = document.getElementById('firstNameErrorMsg');
    let getLastNameError = document.getElementById('lastNameErrorMsg');
    let getCityError = document.getElementById('cityErrorMsg');
    let target = e.target;
    if(/^[A-Za-zàâäéèêëïîôöùûüÿç-]{3,20}$/.test(input.value)){
        if(target.name == getForm.firstName.name) {
            getFirstNameError.innerText = 'Prénom valide';
        } else if (target.name == getForm.lastName.name){
            getLastNameError.innerText = 'Nom valide';
        } else if (target.name == getForm.city.name) {
            getCityError.innerText = 'Ville valide';
        }
        return true;
    }
    else {
        if(target.name == getForm.firstName.name) {
            getFirstNameError.innerText = 'Prénom invalide';
        } else if (target.name == getForm.lastName.name){
            getLastNameError.innerText = 'Nom invalide';
        } else if (target.name == getForm.city.name) {
            getCityError.innerText = 'Ville invalide';
        }
        return false;
    }
}

// Test via regex pour les adresses postales
function validAddress(input) {
    if(/^[0-9]{1,2}\s[0-9A-Za-zàâäéèêëïîôöùûüÿç-\s]{3,50}\s[0-9]{5}$/.test(input.value)){
        document
        .getElementById('addressErrorMsg')
        .innerText = 'Adresse valide'
        return true;
    } else {
        document
        .getElementById('addressErrorMsg')
        .innerText = 'Adresse au mauvais format veuillez essayer avec ce format : \'00 rue du 8 mai 50258\''
        return false;
    }
}

// Test via regex pour les email
function validEmail(input) {
    if(/^[0-9A-Za-z-.\w]{3,40}[@][A-Za-z0,9-\w]{1,10}.[a-z]{2,10}$/.test(input.value)) {
        document
            .getElementById('emailErrorMsg')
            .innerText = 'Adresse mail valide'
        return true;
    } else {
        document
            .getElementById('emailErrorMsg')
            .innerText = 'Adresse mail invalide'
        return false;
    }
}

// Méthod fetch renvoie sur la page de confirmation avec le numéro de commande en id de l'URL si la promesse est résolue
function fetchPost(data) {
    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then((res) => {
        if(res.ok){
            return res.json();
        }
    })
    .then((value) => {
        window.location.href='http://127.0.0.1:' + locat + '//front/html/confirmation.html?id=' + value.orderId;
    })
}

let getForm = document.querySelector('.cart__order__form')
let getButton = document.querySelector('#order')
let contact = {
    firstName: this,
    lastName: this,
    address: this,
    city: this,
    email: this
}

if(window.location == 'http://127.0.0.1:' + locat + '//front/html/cart.html'){
    showProduct();
    changeQuantityInStorage();
    deleteProduct();

    getForm.firstName.addEventListener('change', (e) => {
        if(validFirstAndLastNameAndCity(getForm.firstName, e)){
            return contact.firstName = e.target.value;
        }
    });
    getForm.lastName.addEventListener('change', (e) => {
        if(validFirstAndLastNameAndCity(getForm.lastName, e)){
            return contact.lastName = e.target.value;
        }
    })
        
    getForm.city.addEventListener('change', (e) => {
        if(validFirstAndLastNameAndCity(getForm.city, e)){
            return contact.city = e.target.value;
        }
    })
        
    getForm.address.addEventListener('change', (e) => {
        if(validAddress(getForm.address)){
            return contact.address = e.target.value;
        }
    })
        
    getForm.email.addEventListener('change', (e) => {
        if(validEmail(getForm.email)){
            return contact.email = e.target.value;
        }
    })
    
    getButton.addEventListener('click', (event) => {
        if(basket == false) {
            alert('Votre panier est vide');
            event.preventDefault();
        } else {
            let products = [];
            for(let i = 0; i < basket.length; i++){
                products.push(basket[i].id);
            }
            if(validEmail(getForm.email) && validAddress(getForm.address) && validFirstAndLastNameAndCity(getForm.city, event) && validFirstAndLastNameAndCity(getForm.lastName, event) && validFirstAndLastNameAndCity(getForm.firstName, event)){
                let promise = {
                    contact,
                    products
                }
                fetchPost(promise);
            } else {
                alert('Veuillez remplir tous les champs');
                event.preventDefault();
            }
        }
    })

} else {
    if(basket != false) {
        let orderId = document.getElementById('orderId');
        let params = new URLSearchParams(window.location.search);
        orderId.innerText = params.get('id') + '\nMerci pour votre commande !!';
        localStorage.clear();
    } else {
        if(confirm('Attention si vous cliquez sur OK vous serez redirigé vers la page d\'accueil.\nPensez à noter votre numéro de commande')) {
            window.location.href='http://127.0.0.1:' + locat + '//front/html/index.html';
        } else {
            let orderId = document.getElementById('orderId');
            let params = new URLSearchParams(window.location.search);
            orderId.innerText = params.get('id') + '\nMerci pour votre commande !!';
        }
    }
}

