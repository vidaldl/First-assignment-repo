import { findProductById } from "./externalServices.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}
function addToCart() {
  // Get current cart or initialize empty array if none exists
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // If cart isn't an array yet (handling first item case)
  if (!Array.isArray(cart)) {
    cart = [cart];
  }

  // Add the current product to the cart array
  cart.push(product);

  // Save updated cart back to localStorage
  setLocalStorage("so-cart", cart);
}
function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryMedium;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}