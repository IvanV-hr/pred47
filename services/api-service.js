const productsApiEndpoint = "https://dummyjson.com/products/";

export async function dohvatiOpremu() {
  const response = await fetch(
    productsApiEndpoint + "category/sports-accessories",
  );

  if (!response.ok) {
    throw new Error();
  }

  return (await response.json()).products;
}
