const nodemailer = require("nodemailer");

const sendOrderConfirmationEmail = async (userDetails, cart, totalPrice) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const itemsList = cart
    .map(
      (item) =>
        `<tr><td>${item.name}</td><td>${item.quantity}</td><td>$${item.price}</td><td>$${(
          item.price * item.quantity
        ).toFixed(2)}</td></tr>`
    )
    .join("");

  const emailContent = `
    <h2>Order Confirmation</h2>
    <p>Dear ${userDetails.fullName},</p>
    <p>Thank you for your order! Below are your order details:</p>
    
    <h3>📦 Order Details:</h3>
    <p><b>Order ID:</b> #${Math.floor(Math.random() * 1000000)}</p>
    <p><b>Total Amount:</b> $${totalPrice.toFixed(2)}</p>

    <h3>🛒 Items Ordered:</h3>
    <table border="1" cellpadding="5" cellspacing="0">
      <tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr>
      ${itemsList}
    </table>

    <h3>📍 Shipping Information:</h3>
    <p><b>Name:</b> ${userDetails.fullName}</p>
    <p><b>Email:</b> ${userDetails.email}</p>
    <p><b>Phone:</b> ${userDetails.phone}</p>
    <p><b>Address:</b> ${userDetails.address}</p>
    <p><b>Postal Code:</b> ${userDetails.postalCode}</p>

    <p>Thank you for shopping with us! 🚀</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userDetails.email,
    subject: "Order Confirmation - Thank You for Your Purchase!",
    html: emailContent,
  });
};

module.exports = sendOrderConfirmationEmail;
