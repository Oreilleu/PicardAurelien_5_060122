let params = new URLSearchParams(window.location.search)
let itemImage = document.querySelector('div.item__img')
try {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        for(let i = 0; i < data.length; i++) {
            if(params.get('id') == data[i]._id){
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
            }
        }
    })
} catch (error) {
    console.error(error)
}


// Récup 1 canap par canap id dans requete

let color = document.getElementById('colors')

fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926')
    .then(res => res.json())
    .then(dataa => {
        console.table(dataa)
        for(let j = 0; j < dataa.colors.length; j++){
            let createOption = document.createElement('option')
            createOption.setAttribute('value', dataa.colors[j])
            createOption.innerText = dataa.colors[j]
            color.appendChild(createOption)
        }
    })