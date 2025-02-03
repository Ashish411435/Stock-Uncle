<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Load PHPMailer

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $fullname = htmlspecialchars(trim($_POST["fullname"]));
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $subject = htmlspecialchars(trim($_POST["subject"]));
    $message = htmlspecialchars(trim($_POST["message"]));

    if (!$fullname || !$email || !$subject || !$message) {
        echo json_encode(["status" => "error", "message" => "Invalid input data."]);
        exit;
    }

    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Change to your SMTP server (Amazon SES, SendGrid, etc.)
        $mail->SMTPAuth = true;
        $mail->Username = 'ash32623k@gmail.com'; // Your SMTP email
        $mail->Password = 'jxfgszikoujlfl mw'; // App Password (not your Gmail password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587; // Use 465 for SSL

        $mail->setFrom("noreplay@stockuncle.in", "Stock Uncle");
        $mail->addAddress('ashishkamal1210@gmail.com', 'Stock Uncle');
        $mail->addReplyTo($email, $fullname);

        $mail->isHTML(true);
        $mail->Subject = htmlspecialchars($subject);
        $mail->Body = "<p><strong>Name:</strong> $fullname</p>
                       <p><strong>Email:</strong> $email</p>
                       <p><strong>Message:</strong><br>" . nl2br($message) . "</p>";

        if ($mail->send()) {
            echo json_encode(["status" => "success", "message" => "Your message has been sent successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Email sending failed."]);
        }
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Mailer Error: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
}
?>
