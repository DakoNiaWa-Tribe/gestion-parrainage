import os
import vonage
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv


load_dotenv()

VONAGE_API_KEY = os.getenv("VONAGE_API_KEY")
VONAGE_API_SECRET = os.getenv("VONAGE_API_SECRET")
VONAGE_FROM_NUMBER = os.getenv("VONAGE_FROM_NUMBER") 

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def send_sms(to_number, message):
    client = vonage.Client(key=VONAGE_API_KEY, secret=VONAGE_API_SECRET)
    sms = vonage.Sms(client)

    responseData = sms.send_message(
        {
            "from": VONAGE_FROM_NUMBER,
            "to": to_number,
            "text": message,
        }
    )

    if responseData["messages"][0]["status"] == "0":
        print("✅ SMS envoyé avec succès !")
    else:
        print(f"❌ Erreur lors de l'envoi du SMS : {responseData['messages'][0]['error-text']}")

#def send_email(to_email, subject, message_body):
 #   msg = MIMEMultipart()
  #  msg['From'] = EMAIL_ADDRESS
   # msg['To'] = to_email
    #msg['Subject'] = subject

#    msg.attach(MIMEText(message_body, 'plain'))
#
 #   try:
   #     with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
    #        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
     #       server.sendmail(EMAIL_ADDRESS, to_email, msg.as_string())
      #      print("✅ Email envoyé avec succès !")
   # except Exception as e:
    #    print(f"❌ Erreur lors de l'envoi de l'email : {str(e)}")

# Exemple d'utilisation :
send_sms("+221762796367", "Bonjour, ceci est un test avec Vonage !")
#send_email("ibhdaz@exemple.com", "Test de l'email", "Ceci est un test d'email avec Python !")
