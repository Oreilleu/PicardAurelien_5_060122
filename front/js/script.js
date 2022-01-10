// Récupère les données de l'API et les ajoutent dans l'index.html

let items = document.getElementById('items')
let a;

fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    console.table(data)
    for(let i = 0; i < data.length; i++) {
        a = document.createElement('a');
        a.setAttribute('href', './product.html?id=42')
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

let params = new URL('./product.html?id=42')
console.log(params)


/* 
Faire lien entre les produits de la page d'acceuil et la page produit (“URLSearchParams”)
*/