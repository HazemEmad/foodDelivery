import {get} from 'lodash';

export const floatingPrice = (price, currency = true) => {
  return (
    Number(price)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (currency ? ' EGP' : '')
  );
};
export const helperAddToCart = (item, counter, cart) => {
  let foundIndex = cart.findIndex(obj => get(obj, 'name') == get(item, 'name'));
  if (counter != 0) {
    if (foundIndex == -1) {
      cart.push({...item, price: item.price * counter, qty: counter});
    } else {
      let price = cart[foundIndex].price / cart[foundIndex].qty;
      cart[foundIndex].qty = counter;
      cart[foundIndex].price = price * counter;
    }
  } else {
    cart.splice(foundIndex, 1);
  }
  return cart;
};
