let cartIcon = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close-btn');
let body = document.querySelector('body');
let productListHTML = document.querySelector('.product-list');
let cartListHTML = document.querySelector('.cart-list');
let cartIconSpan = document.querySelector('.cart-icon span');

let productList = [];

let carts = [];

cartIcon.addEventListener('click', () => {
    body.classList.toggle('show-cart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
});


// Displaying product data to HTML
const addDataToHTML = () => {

    productListHTML.innerHTML ='';

    if(productList.length > 0){

        productList.forEach(product => {

            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;

            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="add-to-cart">Add to Cart</button>
            `;

            productListHTML.appendChild(newProduct);
        });
    }

}


// Event-litenser to add product with givwn product id to cart
productListHTML.addEventListener('click', (event) => {
    let positionClick = event.target;

    if(positionClick.classList.contains('add-to-cart')){
        let productID = positionClick.parentElement.dataset.id;
        // alert(productID);
        addToCart(productID);
    }
});

const addToCart = (productID) => {

    let positionThisProductInCart = carts.findIndex((value) => value.productID == productID );

    if(carts.length <=0 ){
        carts = [{
            productID: productID,
            quantity: 1
        }];
    }else if(positionThisProductInCart < 0){
        carts.push({
            productID: productID,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity += 1;
    }
    // console.log(carts);

    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    cartListHTML.innerHTML = '';

    let totalQuantity = 0;

    if(carts.length > 0){
        carts.forEach(cart => {

            totalQuantity += cart.quantity;

            let newCart = document.createElement('div');
            newCart.classList.add('cart-item');
            newCart.dataset.id = cart.productID;

            let positionProduct = productList.findIndex((value) => value.id == cart.productID);
            let info = productList[positionProduct];
            
            newCart.innerHTML = `
            <div class="cart-item-image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="cart-item-name">
                    ${info.name}
                </div>
                <div class="total-price">
                    $${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
                `;

                cartListHTML.appendChild(newCart);
        })
    }
    cartIconSpan.innerText = totalQuantity;
}

cartListHTML.addEventListener('click', (event) => {
    let positionClick = event.target;

    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let productID = positionClick.parentElement.parentElement.dataset.id;
        // console.log(productID);
        
        let type = 'minus';

        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQunatity(productID, type);
    }
})

const changeQunatity = (productID, type) => {
    let positionItemInCart = carts.findIndex((value) => value.productID == productID);

    if(positionItemInCart >= 0){
        switch(type){
            case 'plus':
                carts[positionItemInCart].quantity += 1;
                break;
            default:
                let valueChange = carts[positionItemInCart].quantity -1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

// As soon as webpage loads
const initApp = () => {

    // getting data from the json
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            productList = data;
            // console.log(productList);
            addDataToHTML();

            //get cart from memory
            if(localStorage.getItem('cart')){
                carts  = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
}
initApp();