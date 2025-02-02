<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize inputs
    $fullname = htmlspecialchars(trim($_POST["fullname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    // Check if required fields are filled
    if (!$fullname || !$email || !$subject || !$message) {
        echo json_encode(["status" => "error", "message" => "Invalid input data."]);
        exit;
    }

    // Set recipient email (change to your email)
    $to = "ashishkamal1210@gmail.com";
    $headers = "From: $fullname <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    $mailSent = mail($to, $subject, $message, $headers);

    if ($mailSent) {
        echo json_encode(["status" => "success", "message" => "Message sent successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to send email."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
