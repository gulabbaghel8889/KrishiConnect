export const createOrder = async (orderData, token) => {
  const response = await fetch("http://localhost:5000/api/orders/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  return response.json();
};