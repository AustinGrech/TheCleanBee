const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000; // You can choose any port you prefer

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static("public"));

// Handle form submission
app.post("/submit-form", (req, res) => {
  const name = req.body.name;
  const phone = "+12263447468";
  const message = req.body.message;

  // Process the form data, if needed (e.g., store in database, send email)

  // For this example, let's just log the form data and send a response back to the client.
  console.log("Form Data:", { name, phone, message });
  res.send("Form submitted successfully!");
});

// Send SMS
app.post("/send-sms", (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  // Twilio phone number you obtained

  const client = twilio(accountSid, authToken);

  const { name, phone, message } = req.body;

  const textMessage = `New inquiry from ${name} (${phone}): ${message}`;

  client.messages
    .create({
      body: textMessage,
      from: twilioPhoneNumber,
      to: "+12263447468", // Use the phone number provided by the user (with a country code, e.g., +123456789)
    })
    .then((message) => {
      console.log("Text message sent successfully!", message.sid);
      res.json({ success: true });
    })
    .catch((error) => {
      console.error("Text message failed to send:", error);
      res.status(500).json({ success: false, error: "Failed to send message" });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
