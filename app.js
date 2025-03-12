let cartIcon = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close-btn');
let body = document.querySelector('body');

let productListHTML = document.querySelector('.product-list');

let productList = [];

cartIcon.addEventListener('click', () => {
    body.classList.toggle('show-cart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
});

const addDataToHTML = () => {

    productListHTML.innerHTML ='';

    if(productList.length > 0){

        productList.forEach(product => {

            let newProduct = document.createElement('div');
            newProduct.classList.add('item');

            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">${product.price}</div>
                <button class="add-to-cart">Add to Cart</button>
            `;

            productListHTML.appendChild(newProduct);
        });
    }

}

const initApp = () => {

    // getting data from the json
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            productList = data;
            // console.log(productList);
            addDataToHTML();
        });

}
initApp();