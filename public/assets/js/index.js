document.addEventListener("DOMContentLoaded", function () {
  // Form validation
  const form = document.querySelector("form");
  const nameInput = document.querySelector('input[type="text"]');
  const emailInput = document.querySelector('input[type="email"]');
  const messageInput = document.querySelector("textarea");
  const submitButton = document.querySelector("button[type='submit']");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validateForm()) {
      // Simulate form submission (Replace this with your actual form submission logic)
      console.log("Form submitted successfully!");
      form.reset();
    }
  });

  function validateForm() {
    let isValid = true;

    if (nameInput.value.trim() === "") {
      isValid = false;
      setError(nameInput, "Please enter your name");
    } else {
      removeError(nameInput);
    }

    if (emailInput.value.trim() === "") {
      isValid = false;
      setError(emailInput, "Please enter your email");
    } else if (!isValidEmail(emailInput.value.trim())) {
      isValid = false;
      setError(emailInput, "Please enter a valid email address");
    } else {
      removeError(emailInput);
    }

    if (messageInput.value.trim() === "") {
      isValid = false;
      setError(messageInput, "Please enter your message");
    } else {
      removeError(messageInput);
    }

    return isValid;
  }

  function setError(inputElement, errorMessage) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("error-message");
    errorElement.textContent = errorMessage;
    inputElement.classList.add("error");
    inputElement.parentNode.appendChild(errorElement);
  }

  function removeError(inputElement) {
    const errorElement =
      inputElement.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.remove();
    }
    inputElement.classList.remove("error");
  }

  function isValidEmail(email) {
    // Simple email validation (replace with more robust validation if needed)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const message = formData.get("message");

    fetch("/send-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Message sent successfully!");
          // Optionally, show a success message to the user
        } else {
          alert("Failed to send message. Please try again later.");
          // Optionally, show an error message to the user
        }
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
        alert("Failed to send message. Please try again later.");
        // Optionally, show an error message to the user
      });
  });
});

function toggleServiceDetails(element) {
  const serviceDetails = element.nextElementSibling;
  serviceDetails.classList.toggle("show");
}
