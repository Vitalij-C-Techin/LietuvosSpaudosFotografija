package lt.techin.lsf.service;

import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TrackOpens;
import com.mailjet.client.transactional.TransactionalEmail;
import com.mailjet.client.transactional.response.SendEmailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

@Service
@PropertySource(
        value = "classpath:credentials.yaml")
public class EmailService {

    private final MailjetClient mailjetClient;

    @Value("${email}")
    private String senderMail;

    private String recipientMail;

    private String subject;

    private String htmlMailMessage;
    @Autowired
    public EmailService(MailjetClient mailjetClient) {
        this.mailjetClient = mailjetClient;
    }

    public void sendMailUsingMailjet(String recipientMail, String subject, String htmlMailMessage) {
        try {
            TransactionalEmail message1 = TransactionalEmail
                    .builder()
                    .to(new SendContact(recipientMail))
                    .from(new SendContact(senderMail))
                    .htmlPart(htmlMailMessage)
                    .subject(subject)
                    .trackOpens(TrackOpens.ENABLED)
                    .header("test-header-key", "test-value")
                    .customID("custom-id-value")
                    .build();

            SendEmailsRequest request = SendEmailsRequest
                    .builder()
                    .message(message1)
                    .build();


            SendEmailsResponse response = request.sendWith(mailjetClient);

        } catch (MailjetException e) {
            e.printStackTrace();
        }
    }
}


