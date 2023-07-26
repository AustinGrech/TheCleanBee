// main.js file

window.onload = function () {
  document.getElementById("contact-form").onsubmit = function (event) {
    event.preventDefault(); // Prevent form from submitting through default browser behavior

    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Your Twilio account SID and Auth Token
    const accountSid = "AC53b804f468ce3486006ffc77e7f9bb97";
    const authToken = "1b40b74bf1855cad3fd0f4df6496547b";

    // Create a Twilio client
    const client = new Twilio(accountSid, authToken);

    // The Twilio phone number you obtained
    const twilioPhoneNumber = "+12295972844";

    // The phone number where you want to receive the text message
    const yourPhoneNumber = "+12263447468";

    // Compose the message
    const textMessage = `New inquiry from ${name} (${phone}): ${message}`;

    // Send the text message
    client.messages
      .create({
        body: textMessage,
        from: twilioPhoneNumber,
        to: yourPhoneNumber, // Use the inputted phone number with a country code (e.g., +123456789)
      })
      .then((message) => {
        console.log("Text message sent successfully!", message.sid);
        // Optionally, show a success message to the user
      })
      .catch((error) => {
        console.error("Text message failed to send:", error);
        // Optionally, show an error message to the user
      });
  };
};
