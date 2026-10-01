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

export async function promijeniNaslov(id, naslov) {
  const response = await fetch(productsApiEndpoint + id, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: naslov,
    }),
  });

  if (!response.ok) {
    throw new Error();
  }

  return await response.json();
}
