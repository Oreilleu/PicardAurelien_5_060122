let colors = document.getElementById('colors')

fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => {
        console.table(data)
        document
            .getElementById('title')
            .innerText = data[0].name

        document
            .getElementById('description')
            .innerText = data[0].description

        let optionOne = document.createElement('option')
        optionOne.innerText = "vert"
        colors.appendChild(optionOne).setAttribute('value', 'vert')

        let optionTwo = document.createElement('option')
        optionTwo.innerText = "blanc"
        colors.appendChild(optionTwo).setAttribute('value', 'blanc')
    })