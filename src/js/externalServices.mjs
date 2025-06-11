const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const jsonResponse =  await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: 'servicesError', message: jsonResponse };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  const products = data.Result;
  
  // Check if products is an array, if not, return the object directly

  console.log("Found products:", products);
  return products;
  

}

export async function checkout(orderData) {
  const url = `${baseURL}checkout`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  };
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (e) {
    if (!response.ok) {
      console.log(e);
      throw new Error("Checkout failed");
  }
} 
}
