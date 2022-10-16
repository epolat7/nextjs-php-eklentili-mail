<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

$name = htmlentities($_POST['name']);
$mail_sender = htmlentities($_POST['mail']);
$message = htmlentities($_POST['message']);

$file_name = $_FILES['sfile']['name'];
$file_tmp = $_FILES['sfile']['tmp_name'];

date_default_timezone_set('Europe/Istanbul');

$now = date_create()->format('d-m-Y H:i:s');

use PHPMailer\PHPMailer\PHPMailer;

if ($_POST['check'] == '777') {
    require_once 'PHPMailer/PHPMailer.php';
    require_once 'PHPMailer/SMTP.php';
    require_once 'PHPMailer/Exception.php';

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->isSMTP(); //Send using SMTP
        $mail->Host = 'epolat.net'; //Set the SMTP server to send through
        $mail->SMTPAuth = true; //Enable SMTP authentication
        $mail->Username = 'deneme@epolat.net'; //SMTP username
        $mail->Password = 'deneme123'; //SMTP password
        $mail->SMTPSecure = 'ssl'; //Enable implicit TLS encryption
        $mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('deneme@epolat.net', 'Mailer');
        $mail->addAddress('koducyuzaltmisbes@gmail.com', 'Kod365'); //Add a recipient
        $mail->addReplyTo($mail_sender, $name);

        //Attachments
        $mail->addAttachment($file_tmp,$file_name); //Add attachments

        //Content
        $mail->isHTML(true); //Set email format to HTML
        $mail->Subject = 'Mail Servisi';
        $mail->Body = '<b>'.$name.'</b> kişisi bir mail gönderdi<br /><br />';
        $mail->Body .= '<b>Mesaj : </b>'.$message.'<br /><br />';
        $mail->Body .= '<b>E-Posta : </b>'.$mail_sender.'<br /><br />';
        $mail->Body .= '<b>Gönderme Zamanı : </b>'.$now.'<br /><br />';
       
        if($mail->send()){
            echo 'elma';
        }else{
            echo 'armut';
        }  
    } catch (Exception $e) {
        echo "Hata: {$mail->ErrorInfo}";
    }
} else {
    echo 'Hatalı İstek';
}

?>
