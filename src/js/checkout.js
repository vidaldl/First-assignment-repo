import { loadHeaderFooter, getLocalStorage, alertMessage } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".products form fieldset");

document.getElementById("zip").addEventListener("blur", () => {
  console.log("Zip blur triggered");
  checkoutProcess.calculateOrdertotal();
});

document.forms["checkout-form"].addEventListener("submit", (e) => {
    e.preventDefault();

    const form = e.target;
    console.log(form);
    // const order = {
    //     orderDate: new Date().toISOString(),
    //     fname: form.fname.value,
    //     lname: form.lname.value,
    //     street: form.street.value,
    //     city: form.city.value,
    //     state: form.state.value,
    //     zip: form.zip.value,
    //     cardNumber: form.cardNumber.value,
    //     expiration: form.expiration.value,
    //     code: form.code.value,
    //     items: checkoutProcess.list.map(item => ({
    //     id: item.Id,
    //     name: item.Name,
    //     price: item.FinalPrice,
    //     quantity: 1
    //     })),
    //     orderTotal: checkoutProcess.orderTotal.toFixed(2),
    //     shipping: checkoutProcess.shipping.toFixed(2),
    //     tax: checkoutProcess.tax.toFixed(2)
    // };

    checkoutProcess.checkout(form);
});