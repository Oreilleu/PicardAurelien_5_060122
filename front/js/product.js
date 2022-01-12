let params = new URLSearchParams(window.location.search);
let itemImage = document.querySelector('div.item__img');

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        console.table(data)
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

// Récup 1 canap par canap id dans requete

let color = document.getElementById('colors');

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        
        
        for(let j = 0; j < data.length; j++) {
            console.log(data[j].colors)
            if(params.get('id') == data[j]._id){
                // console.log(data[j]._id)
                fetch('http://localhost:3000/api/products/' + data[j]._id)
                .then(res => res.json())
                .then(data => {
                    for(let w = 0; w < data.colors.length; w++){
                            let createOption = document.createElement('option');
                            createOption.setAttribute('value', data.colors[w]);
                            createOption.innerText = data.colors[w];
                            color.appendChild(createOption);
                    }
                    // console.log(data.colors)
                })
            }
        }
    })





// function colorOption(dataArray) {
//     fetch('http://localhost:3000/api/products/107fb5b75607497b96722bda5b504926')
//     .then(res => res.json())
//     .then(dataa => {
//         console.table(dataa);
//         for(let j = 0; j < dataa.colors.length; j++){
//             let createOption = document.createElement('option');
//             createOption.setAttribute('value', dataa.colors[j]);
//             createOption.innerText = dataa.colors[j];
//             color.appendChild(createOption);
//         }
//     })
// }