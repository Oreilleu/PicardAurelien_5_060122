// Récupère les données de l'API et les ajoutent dans l'index.html

let items = document.getElementById('items')

fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    for(let i = 0; i < data.length; i++) {
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
});