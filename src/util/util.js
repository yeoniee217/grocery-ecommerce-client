
export const formatCurrency = (num) => {
  // let currencyFormat = new Intl.NumberFormat('en-CA', {
  //   style: 'currency',
  //   currency: 'CAD',
  // });
  return new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD',
          }).format(num);
}

export const getCartItemsFromLocalStorage = () => {
  //must parse since the value of localStorage.getItem("cartItems") is string(json format)
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));  //can be null
  console.log('util - *getCartItemsFromLocalStorage', cartItems);
  // if nothing in localStorage, set cartItems(state in compo) to [](empty array),
  // have to return [] if so, cuz need to flag(=mark) the products that are already in cart.
  return cartItems ? cartItems : [];
}

//interesting! dig more**
//basically filtering products using cartItems
export const flagProductsInCart = (cartItems, products) => {
  for (const item of cartItems) {
    console.log(item);
    let product = products.find(product => product.id === item.id);
    console.log(product);

    if(product) {
      product.alreadyInCart = true
    }
  }
}
