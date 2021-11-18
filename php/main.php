<?php
  ini_set('max_execution_time', 0); // 0 = Unlimited
  //include 'chromephp/ChromePhp.php';
  //ChromePhp::log('server side confirming the php script ran');
  
  // save the PDF to the clearpath server
  if(!empty($_POST['pdfData'])){
    $name = $_POST['pdfName'];
    $data = base64_decode($_POST['pdfData']);
    file_put_contents( "../quotes/" . $name . ".pdf", $data );
    $quoteServerDirectoryLocation = "http://rcw01/quotes/" . $name . ".pdf"; 
  }

  // send an email to the clearpath sales person
  $sendEmailToAddress = "rfaultless@clearpathrobotics.com";
  $fromEmailAddress = "From: rhysfaultless@gmail.com";
  $usersNameFirst = $_POST['inputNameFirst'];
  $usersNameLast = $_POST['inputNameLast'];
  $usersEmail = $_POST['inputEmail'];
  $usersCompany = $_POST['inputCompany'];
  $quotedPrice = $_POST['finalPrice'];
  $quotedLead = $_POST['finalLead'];
  $usersCountry = $_POST['inputCountry'];
  $usersState = $_POST['inputState'];

  $subject = "Robot Configuration Webpage " . $name;
  $txt =  "Quote number: " . $name . "\n" .
          "Quote location: " . $quoteServerDirectoryLocation . "\n" .
          "Quoted price: $" . $quotedPrice . " USD \n" .
          "Quoted lead: " . $quotedLead . " weeks \n \n" .
          "User's name: " . $usersNameFirst . " " . $usersNameLast . "\n" .
          "User's email: " . $usersEmail . "\n" .
          "User's company: " . $usersCompany . "\n" .
          "User's country: " . $usersCountry . "\n" .
          "User's state: " . $usersState . "\n" ;
  $retval = mail($sendEmailToAddress,$subject,$txt,$fromEmailAddress);
  exit();
?>