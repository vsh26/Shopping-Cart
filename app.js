let cartIcon = document.querySelector('.cart-icon');
let body = document.querySelector('body');

cartIcon.addEventListener('click', () => {
    body.classList.toggle('show-cart');
});


let closeCart = document.querySelector('.close-btn');

closeCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
});