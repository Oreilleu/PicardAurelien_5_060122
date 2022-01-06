// let items = document.getElementById('items')
// let a , article, img, h3, p, data, i;

// let recoversObjectKanap = function () {
//     fetch('http://localhost:3000/api/products')
//     .then(res => res.json())
//     .then(data => {
//         // console.table(data)
//         for(let i = 0; i < 8; i++) {
//             img.src = data[i].imageUrl
//             h3.innerText = data[i].name
//             p.innerText = data[i].description
//         }
//     })
// }

// let createSectionItems = function () {
//     a = document.createElement('a');
//     a.setAttribute('href', './product.html?id=42')
//     items.appendChild(a);

//     article = document.createElement('article');
//     a.appendChild(article);

//     img = document.createElement('img');
//     img.setAttribute('src', '');
//     article.appendChild(img);

//     h3 = document.createElement('h3');
//     h3.classList.add('productName');
//     article.appendChild(h3);

//     p = document.createElement('p');
//     p.classList.add('productDescription');
//     article.appendChild(p);

//     recoversObjectKanap()
// }

// for(let b = 0; b < 8; b++) {
//     createSectionItems()
// }

// ---------------------------------------------------------------------------- //
let items = document.getElementById('items')
// let createSectionItems = function () {
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    for(let i = 0; i < 8; i++) {
        a = document.createElement('a');
        a.setAttribute('href', './product.html?id=42')
        items.appendChild(a);

        article = document.createElement('article');
        a.appendChild(article);

        img = document.createElement('img');
        img.setAttribute('src', '');
        article.appendChild(img);
        img.src = data[i].imageUrl;

        h3 = document.createElement('h3');
        h3.classList.add('productName');
        article.appendChild(h3);
        h3.innerText = data[i].name;

        p = document.createElement('p');
        p.classList.add('productDescription');
        article.appendChild(p);
        p.innerText = data[i].description;
    }
})


// }

// ---------------------------------------------------------------------------- //




// for(let i = 0; i < 10; i++) {
//     createSectionItems()
// }

// for(let i = 0; i < 10; i++) {
//     createSectionItems()
//     recoversObjectKanap()
// }   

// Création des éléments pour la section "items"

    // if(res.ok) {
        //     console.log(res.json())
            
        // } else {
        //     console.log('Erreur')
        // }

    // .then(function(value) {

    // })
    // .then(function(value) {
    //     document
    //         .getElementById('items')
    //         .innerHTML = '107fb5b75607497b96722bda5b504926'
    //     console.log(value)
    // })