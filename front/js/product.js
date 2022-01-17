/*
 * Requete qui récupère les datas de l'API 
 * Créer les items 
 * Met les data dans les items si la page correspond a l'id de l'item
*/

let idItem, colorItem, nbItem;
let cart = {}
let params = new URLSearchParams(window.location.search);
let itemImage = document.querySelector('div.item__img');
let color = document.getElementById('colors');

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

                document
                    .getElementById('title')
                    .innerText = data[i].name;

                document
                    .getElementById('price')
                    .innerText = data[i].price;

                document
                    .getElementById('description')
                    .innerText = data[i].description;
            }
        }
    })
}


/*
 *
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
 * Stocker l'id, la couleur et le nombre de kanap dans un array
 * Faire un événement qui récupère la couleur et le nombre de kanp dans variable colorItem et nbItem
 * Faire une validation des données saisies
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
        let cart = {
            id: idItem,
            color: colorItem,
            quantity: nbItem
        }
        console.log(cart)
        return addCart(cart)
    });
}

function saveCart(basket) {
    localStorage.setItem('Cart', JSON.stringify(basket));
}

function getCart() {
    let basket = localStorage.getItem('Cart');
    if (basket == null) {
        return [];
    } else {
        return JSON.parse(basket);
    }
}

function addCart(product) {
    let basket = getCart();
    let foundProduct = basket.find(p => p.id == product.id && p.color == product.color);
    console.log(foundProduct)
        if(foundProduct != undefined) {
            if(product.quantity == null) {
                product.quantity = 0;
            }
            foundProduct.quantity = parseInt(foundProduct.quantity) + parseInt(product.quantity)
            
        } else {
            product.quantity
            basket.push(product);
        }


    saveCart(basket);
}

AddItemWithDataToProducts()
AddOptionSelect()
ClickOnCart()

// Utilisation d'object obligatoire ?
// Voir avec yazid si il y avait possibilité de faire comme si dessous donc retourner a chaque clique un tableau unique

// for(let c = 0; c < arrayCart.length; c++){
//     if (compteur[arrayCart[c]] === undefined) {
//         compteur.push(cart)
//         cart = []
//         console.log(compteur)
//         console.log('je push cart')
     
//     } 
//     else if (cart[0] == compteur[c][0] && cart[1] == compteur[c][1]){
//         // parseInt(cart[2])++
//         console.log(compteur)
//         console.log('je ne push pas cart')
//         cart = []
            
//     }
// }
        /**
         * Lorsqu'un je clique sur AJouter au panier on ajoute le produit au panier OK
         * SI le produit n'est pas présent dans le panier
         *      Ajoute l'élément dans le panier
         * SINON SI le produit est présent (id et couleur identique)
         *      J'incrémente la quantité du produit correspondant 
        */
// localStorage.setItem('arrayCart', JSON.stringify(arrayCart));




