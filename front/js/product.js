/*
 * Requete qui récupère les datas de l'API 
 * Créer les items 
 * Met les data dans les items si la page correspond a l'id de l'item
*/

let idItem, colorItem, nbItem;
let cart = [];
let arrayCart = []

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
                // localStorage.setItem('img', data[i].imageUrl)
                // localStorage.setItem('alt', data[i].altTxt)


                document
                    .getElementById('title')
                    .innerText = data[i].name;
                    // localStorage.setItem('title', data[i].name)

                document
                    .getElementById('price')
                    .innerText = data[i].price;
                    // localStorage.setItem('price', data[i].price)

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

function AddOptionToSelectWithData() {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for(let j = 0; j < data.length; j++) {
            if(params.get('id') == data[j]._id){
                idItem = data[j]._id;
                // localStorage.setItem('id', data[j]._id)
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

function getValue() {
    color.addEventListener('change', function(e) {
        // localStorage.setItem('color', e.target.value)
        colorItem = e.target.value
    });
    
    let quantityCanap = document.getElementById('quantity');
    quantityCanap.addEventListener('change', function(e) {
        // localStorage.setItem('number', e.target.value)
        nbItem = e.target.value
    });
    
    let button = document.getElementById('addToCart');
    button.addEventListener('click', function(e) {
        cart.push(idItem)
        cart.push(colorItem)
        cart.push(nbItem)
        arrayCart.push(cart)
        localStorage.setItem('arrayCart', JSON.stringify(arrayCart));
        console.log(arrayCart)

        for(let i = 0; i < arrayCart.length; i++) {
            if(cart[i] = arrayCart){
                console.log(true)
            } else {
                console.log(false)
            }
        }

        if(button.click) {
            cart = []
        }
        return arrayCart;
    });
}

console.log(cart)



// for(let i = 0; i < getValue().length)
// for(let i = 0; i < arrayCart.length; i++) {
//     if(cart[i] = arrayCart){
        


//     } else {
//         console.log(false)
//     }
// }
console.log(arrayCart)



AddItemWithDataToProducts()
AddOptionToSelectWithData()
getValue()

