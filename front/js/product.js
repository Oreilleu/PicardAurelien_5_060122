/*
    Trouver quoi faire avec la grosse image 
    On veut afficher le nom du produit dans #title -- OK
    On veut afficher le produit dans #price -- OK
    On veut afficher la description dans #description -- ok
    On veut afficher les option vert et blanc dans colors 
        SI vert est sélectionner 
            On affiche canap vert
        SI blanc est sélectionner
            On affiche blanc
*/


let colors = document.getElementById('colors')
let itemImage = document.querySelector('div.item__img')

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        console.table(data)

        let createImg = document.createElement('img')
        itemImage.appendChild(createImg).setAttribute('img', '')
        createImg.src = data[0].imageUrl

        document
            .getElementById('title')
            .innerText = data[0].name

        document
            .getElementById('price')
            .innerText = data[0].price

        document
            .getElementById('description')
            .innerText = data[0].description

        /* 
        Je veux récupérer les tableaux colors de ma data
        
        Je veux les afficher dans mes option du select 
        */
        
        
        // for(let i = 0; i <  data.length; i++){
        //     let recupColors = data[0].colors[0]

        //     let createOption = document.createElement('option')
        //     createOption.innerText = recupColors
        //     colors.appendChild(createOption)
        // }
        
        
        // for (let i = 0; i <; i++) {
        //     let createOption = document.createElement('option')
        //     console.log(i)
        //     colors.appendChild(createOption)
        // }

        /*.setAttribute('value', data[i].colors)*/

        // let optionOne = document.createElement('option')
        // optionOne.innerText = "vert"
        // colors.appendChild(optionOne).setAttribute('value', 'vert')

        // let optionTwo = document.createElement('option') 
        // optionTwo.innerText = "blanc"
        // colors.appendChild(optionTwo).setAttribute('value', 'blanc')
    })