export const addToCart = async (data, token) => {
  const response = await fetch("http://localhost:5001/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
};