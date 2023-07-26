<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the form data
    $name = $_POST["name"];
    $phone = $_POST["phone"];
    $message = $_POST["message"];

    // Clear the form fields
    $name = '';
    $phone = '';
    $message = '';

    // Send the email
    $to = "thecleanbee.inquiry@gmail.com"; 
    $subject = "New cleaning inquiry!";
    $body = "Name: $name\nPhone Number: $phone\nMessage: $message";

    
    $headers = "From: noreply@example.com\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Thank you for your message. We'll be in touch soon!";
    } else {
        echo "Oops! Something went wrong. Please try again later.";
    }
}
?>
