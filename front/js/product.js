/*
 * Requete qui récupère les datas de l'API 
 * Créer les items 
 * Met les data dans les items si la page correspond a l'id de l'item
*/

let idItem, colorItem, nbItem;
let dataCanap = [];
let params = new URLSearchParams(window.location.search);
let itemImage = document.querySelector('div.item__img');

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        // console.table(data)
        for(let i = 0; i < data.length; i++) {
            if(params.get('id') == data[i]._id){
                let createImg = document.createElement('img');
                itemImage.appendChild(createImg).setAttribute('img', '');
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

/*
 *
*/

let color = document.getElementById('colors');

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for(let j = 0; j < data.length; j++) {
            // console.log(data[j].colors)
            if(params.get('id') == data[j]._id){
                // console.log(data[j]._id)
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
                    // Trouver moyen de stocké le choix dans variable colorItem
                    // colorItem = createOption.value;
                    // dataCanap.push(colorItem)
                    // console.log(dataCanap)
                    // console.log(data.colors)
                })
            }
        }
    })

/* 
 * Stocker l'id, la couleur et le nombre de kanap dans un array
 * Faire un événement qui récupère la couleur et le nombre de kanp dans variable colorItem et nbItem
 * Faire une validation des données saisies
*/
color.addEventListener('change', function(e) {
    colorItem = e.target.value;
});

let quantityCanap = document.getElementById('quantity');

quantityCanap.addEventListener('change', function(e) {
    nbItem = e.target.value;
});

let button = document.getElementById('addToCart');

button.addEventListener('click', function(e) {
    dataCanap.push(idItem)
    dataCanap.push(colorItem)
    dataCanap.push(nbItem)
    console.log(dataCanap)
    if(button.click){
        dataCanap = []
    }
});