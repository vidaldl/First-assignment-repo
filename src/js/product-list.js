import productList from "./productList.mjs";
import { loadHeaderFooter, getParam} from "./utils.mjs";

const category = getParam("category");


loadHeaderFooter();
productList(category, ".product-list");

const title = document.querySelector("title").innerHTML = `Sleep Outside | Top Products : ${category}`;

