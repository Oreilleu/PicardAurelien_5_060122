/*
 *
*/

// Voir avec Yazid pour le port qui change a chaque deconnection
// Fonction à découper ?

let items = document.getElementById('items');
let a;

fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    for(let i = 0; i < data.length; i++) {
        a = document.createElement('a');
        a.setAttribute('href', new URL('http://127.0.0.1:46693//front/html/product.html?id=' + data[i]._id));
        items.appendChild(a);

        article = document.createElement('article');
        a.appendChild(article);

        img = document.createElement('img');
        img.setAttribute('alt', data[i].altTxt);
        img.setAttribute('src', data[i].imageUrl);
        article.appendChild(img);

        h3 = document.createElement('h3');
        h3.classList.add('productName');
        article.appendChild(h3);
        h3.innerText = data[i].name;

        p = document.createElement('p');
        p.classList.add('productDescription');
        article.appendChild(p);
        p.innerText = data[i].description;
    }
});