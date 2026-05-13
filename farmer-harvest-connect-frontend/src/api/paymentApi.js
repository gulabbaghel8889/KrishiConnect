export const initiatePayment = async (
  amount,
  token
) => {
  const response = await fetch(
    "http://localhost:5001/api/payments/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    }
  );

  return response.json();
};