// Creat all the Element for the section in HTML
function getSectionAndAddIn(id, color, image, alt, name, color, quantity){
    let getSection = document.getElementById('cart__items');
    appendToElement(createArticleWithAtribute(id, color, image, alt, name, color, quantity), getSection);
}

function createArticleWithAtribute(id, color, image, alt, name, color, quantity) {
    let article =  document.createElement('article');
    article.setAttribute('class', 'cart__item');
    article.setAttribute('data-id', id);
    article.setAttribute('data-color', color);

    appendToElement(createBlocDivImg(image, alt), article);
    appendToElement(createDivContent(name, color, id, quantity), article);

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

function createDivContent(name, color, id, quantity) {
    let divCartItemContent = document.createElement('div');
    divCartItemContent.setAttribute('class', 'cart__item__content');

    appendToElement(createBlocDivDescription(name, color, id, quantity), divCartItemContent);
    appendToElement(createDivSettings(quantity), divCartItemContent);

    return divCartItemContent;
}

// Utiliser la quantité * price pour le prix mais réussir a extraire le price
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
    // let price = getPrice(id);
    // priceProduct.innerText = price + ' €';
    getPrice(id, priceProduct, quantity)
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

// Faire une function qui retour un prix grace a fetch si l'idItem == idLocalstorage
function getPrice(item, varPrice, quantity) {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            if(item == data[i]._id) {
                varPrice.innerText = data[i].price * quantity;
            }
        }
    })
}


/* ---------------------------------------------------------------------------------------------------------------------------------------------- */



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
        getSectionAndAddIn(basket[i].id, basket[i].color, basket[i].img, basket[i].alt, basket[i].name, basket[i].color,/* basket[i].price,*/ basket[i].quantity)
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
/**
 * See with Yazid if reload the page is ok for the price on the cart page 
 * or if i have to make a function who manage this 
*/

// Make an function who manage delete of the product
function deleteProduct() {
    let deleteProduct = document.querySelectorAll('.deleteItem');
    let bask = getArrayStorage();
    for (let m = 0; m < deleteProduct.length; m++) {
        deleteProduct[m].addEventListener('click', (e) => {
            let getChangeId = bask[m].id;
            let getChangeColor = bask[m].color;
            let change = getChangeId + getChangeColor;
            bask = bask.filter(p => p.id + p.color != change);
            saveCart(bask);
            location.reload();
        })
    }
}

// Récuperer la totalité des input et faire la somme dans cart__price
// Et récuperer la valeur du prix, faire la somme et les envoyé dans totalprice
function QuantityAndPrice() {
    let sumQuantity = totalQuantity();
    document
        .getElementById('totalQuantity')
        .innerText = sumQuantity;
    
    let sumPrice = totalPrice();
    document
        .getElementById('totalPrice')
        .innerText = sumPrice;

}

function totalQuantity() {
    let input = document.querySelectorAll('.itemQuantity');
    let sum = 0;
    for(let i = 0; i < input.length; i++) {
        let parse = parseInt(input[i].value)
        sum += parse
    }
    return sum;
}

function totalPrice() {
    let price = document.querySelectorAll('.cart__item__content__description');
    let sum = 0;
    for(let i = 0; i < price.length; i++) {
        let parse = parseInt(price[i].lastChild.innerText);
        sum += parse
    }
    return sum;
}

if(window.location == 'http://127.0.0.1:46693//front/html/cart.html'){
    showProduct()
    changeQuantityInStorage()
    deleteProduct()
    QuantityAndPrice()

    /***
     * Make an function who get the value of the input and make an object contact with data of form
     * Show an error msg if the input are false
     * return in an object all the value of the form 
     */


    let getForm = document.querySelector('.cart__order__form')
    let getButton = document.querySelector('#order')
    let contact = {
        firstName: this,
        lastName: this,
        address: this,
        city: this,
        email: this
    }

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

    function validAddress(input) {
        if(/^[0-9]{2}\s[0-9A-Za-zàâäéèêëïîôöùûüÿç-\s]{3,50}\s[0-9]{5}$/.test(input.value)){
            document
            .getElementById('addressErrorMsg')
            .innerText = 'Adresse Valide'
            return true;
        } else {
            document
            .getElementById('addressErrorMsg')
            .innerText = 'Adresse au mauvais format veuillez essayer avec ce format : \'00 rue du 8 mai 50258\''
            return false;
        }
    }

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


    // Je veux vérifier que tout les champs sont rempli 
    getButton.addEventListener('click', (event) => {
        event.preventDefault();
        let product = getArrayStorage();
        let products = []
        for(let i = 0; i < product.length; i++){
            products.push(product[i].id)
        }
        if(validEmail(getForm.email) && validAddress(getForm.address) && validFirstAndLastNameAndCity(getForm.city, event) && validFirstAndLastNameAndCity(getForm.lastName, event) && validFirstAndLastNameAndCity(getForm.firstName, event)){
            let reg = {
                contact,
                products
            }
            fetchPost(reg);
        }else {
            alert('Veuillez remplir tous les champs')
        }
    })

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
            window.location.href='http://127.0.0.1:46693//front/html/confirmation.html?id=' + value.orderId;
        })
    }

} else {
    let test = document.querySelector('#orderId');
    let params = new URLSearchParams(window.location.search);
    test.innerText = params.get('id');
    localStorage.clear();
}

