/*
    Trouver quoi faire avec la grosse image 
    On veut afficher le nom du produit dans #title -- OK
    On veut afficher le produit dans #price -- OK
    On veut afficher la description dans #description -- OK
    On veut que chaque page ai son adresse -- OK
    On veut afficher les option couleurs dans le select

    
*/


let params = new URLSearchParams(window.location.search)
let colors = document.getElementById('colors')
let itemImage = document.querySelector('div.item__img')

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        console.table(data)
        // console.log(data[1]._id)
        for (let i = 0; i < data.length; i++) {
            if(params.get('id') == data[i]._id){
                console.log(data[i]._id)
                let createImg = document.createElement('img')
                itemImage.appendChild(createImg).setAttribute('img', '')
                createImg.src = data[i].imageUrl

                document
                    .getElementById('title')
                    .innerText = data[i].name

                document
                    .getElementById('price')
                    .innerText = data[i].price

                document
                    .getElementById('description')
                    .innerText = data[i].description
                break
            }
        }
        
        
    })

    /* 
        Je veux récupérer les tableaux colors de ma data

        Je veux les afficher dans mes option du select
        */
        
        // AFFICHE 8X BLUE DONC PREMIERE VALEUR DU TABLEAU COLORS 0
        // for(let i = 0; i <  data.length; i++){
        //     let recupColors = data[0].colors[0]

        //     let createOption = document.createElement('option')
        //     createOption.innerText = recupColors
        //     colors.appendChild(createOption)
        // }
        
        // AFFICHE RIEN
        // for (let i = 0; i <; i++) {
        //     let createOption = document.createElement('option')
        //     console.log(i)
        //     colors.appendChild(createOption)
        // }

        // let optionOne = document.createElement('option')
        // optionOne.innerText = "vert"
        // colors.appendChild(optionOne).setAttribute('value', 'vert')

        // let optionTwo = document.createElement('option') 
        // optionTwo.innerText = "blanc"
        // colors.appendChild(optionTwo).setAttribute('value', 'blanc')