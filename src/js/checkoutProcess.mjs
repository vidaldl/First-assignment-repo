import { setLocalStorage, getLocalStorage, alertMessage, removeAllAlerts} from "./utils.mjs";

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summaryTotal = document.querySelector(
        this.outputSelector + " #cartTotal"
      );

    const numItems = document.querySelector(
    this.outputSelector + " #num-items"
    );

    numItems.innerText = this.list.length;

    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    // summaryTotal.innerText = "$" + this.itemTotal;
    summaryTotal.textContent = this.itemTotal.toFixed(2);
    
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    
    console.log('Debug values:');
    console.log('Item Total:', this.itemTotal);
    console.log('Shipping:', this.shipping);
    console.log('Tax:', this.tax);
    console.log('Order Total:', this.orderTotal);
    console.log('List length:', this.list.length);
    
    // display all the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    console.log('Trying to update elements:');
    
    const shippingElement = document.querySelector("#shipping");
    const taxElement = document.querySelector("#tax");
    const orderTotalElement = document.querySelector("#order-total");
    

    
    if (shippingElement) shippingElement.textContent = this.shipping.toFixed(2);
    if (taxElement) taxElement.textContent = this.tax.toFixed(2);
    if (orderTotalElement) orderTotalElement.textContent = this.orderTotal.toFixed(2);
  },
  checkout: async function (form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
      setLocalStorage("so-cart", []);
      location.assign("/checkout/success.html");
    } catch (err) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      for (let message in err.message) {
        console.log(message)
        console.log(err.message)
        alertMessage(err.message);
      }

      console.log(err);
    }
  }
}
export default checkoutProcess;