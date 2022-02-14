let idItem, colorItem, nbItem, imgItem, nameItem, priceItem, altItem;
let cart = {};
let params = new URLSearchParams(window.location.search);
let itemImage = document.querySelector('div.item__img');
let color = document.getElementById('colors');


/**
 * La fonction récupère les produits de l'api
 * Elle les parcourt via la boucle for
 * Puis elle crée le produit sur la page SI l'id de l'URL vaut un des id des produits
 */
function AddItemWithDataToProducts() {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            if(params.get('id') == data[i]._id){
                let createImg = document.createElement('img');
                itemImage.appendChild(createImg).setAttribute('img', '');
                createImg.setAttribute('alt', data[i].altTxt)
                createImg.src = data[i].imageUrl;
                imgItem = data[i].imageUrl;
                altItem = data[i].altTxt;

                document
                    .getElementById('title')
                    .innerText = data[i].name;
                    nameItem = data[i].name;

                document
                    .getElementById('price')
                    .innerText = data[i].price;
                    priceItem = data[i].price;

                document
                    .getElementById('description')
                    .innerText = data[i].description;
            }
        }
    })
}


/*
 * La fonction compare les produits de l'API à l'id passer dans l'URL
 * Lorsque le résultat est true, elle récupère le tableau de couleur correspondant
 * Puis crée les options avec les couleurs en valeur  
*/
function AddOptionSelect() {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for(let j = 0; j < data.length; j++) {
            if(params.get('id') == data[j]._id){
                idItem = data[j]._id;
                fetch('http://localhost:3000/api/products/' + data[j]._id)
                .then(res => res.json())
                .then(data => {
                    for(let w = 0; w < data.colors.length; w++){
                            let createOption = document.createElement('option');
                            createOption.setAttribute('value', data.colors[w]);
                            createOption.innerText = data.colors[w];
                            color.appendChild(createOption);
                    }
                })
            }
        }
    })
}


/* 
 * La fonction récupère la valeur de la couleur et de la quantité choisie
 * Puis elle constitue l'objet cart avec les valeurs recupèré dans AddItemWithDataToProducts() et AddOptionSelect()
 * Après un test elle return l'object
*/
function ClickOnCart() {
    color.addEventListener('change', function(e) {
        colorItem = e.target.value
    });
    
    let quantityCanap = document.getElementById('quantity');
    quantityCanap.addEventListener('change', function(e) {
        nbItem = e.target.value
    });
    
    let button = document.getElementById('addToCart');
    button.addEventListener('click', function() {
        if(nbItem == 0 || nbItem == null) {
            alert('Veuillez choisir une quantité');
        } else if (nbItem > 100) {
            alert('Veuillez choisir une quantité infèrieur à 100');
        } else if (colorItem == null || colorItem == "") {
            alert('Veuillez choisir couleur');
        } else {
            let cart = {
                id: idItem,
                color: colorItem,
                quantity: nbItem,
                img: imgItem,
                name: nameItem,
                alt: altItem
            }
            return addCart(cart)
        }
    });
}

// Crée la clé Cart dans le localStorage et y enverra un objet
function saveCart(basket) {
    localStorage.setItem('Cart', JSON.stringify(basket));
}

// Récupère les valeurs de la clé Cart et return un tableau vide s'il n'existe pas
function getCart() {
    let basket = localStorage.getItem('Cart');
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}

/**
 * Recherche dans le localStorage si le produit(id et color) existe
 * S'il existe on l'incrémente sinon on l'ajoute
 */
function addCart(product) {
    let basket = getCart();
    let foundProduct = basket.find(p => p.id == product.id && p.color == product.color);
        if(foundProduct != undefined) {
            if(product.quantity == null) {
                product.quantity = 0;
            }
            foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(product.quantity)
            
        } else {
            basket.push(product);
        }
    sortBasket(basket);
    saveCart(basket);
}

// Trie le localstorage par rapport à l'id des produits
function sortBasket(basket) {
    basket.sort((a,b) => {
        if(a.id < b.id) {return -1;}
        if(a.id > b.id) {return 1;}
        if(a.id == b.id) {return 0;}
    })
}

AddItemWithDataToProducts()
AddOptionSelect()
ClickOnCart()