const handlePayment = async () => {
  const data = await initiatePayment(totalAmount, token);

  const options = {
    key: "YOUR_RAZORPAY_KEY",
    amount: data.order.amount,
    currency: "INR",
    name: "KrishiConnect",
    description: "Order Payment",
    order_id: data.order.id,

    handler: function (response) {
      alert("Payment Successful");
      console.log(response);
    },

    theme: {
      color: "#16a34a",
    },
  };

  const razor = new window.Razorpay(options);

  razor.open();
};