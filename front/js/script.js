let items = document.getElementById('items');
let a;
let locat = window.location.port;


/**
 * Utilisation de la méthode fetch pour récupérer les produits de l'API
 * La boucle for va créer les produits présents dans l'API
 * Pour chaque création d'un produit, on attribue dans l'id de l'URL l'id du produit lorsque le produit est cliqué
 */
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    for(let i = 0; i < data.length; i++) {
        a = document.createElement('a');
        a.setAttribute('href', new URL('http://127.0.0.1:' + locat + '//front/html/product.html?id=' + data[i]._id));
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
})