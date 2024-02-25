package lt.techin.lsf.service;

import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.resource.Emailv31;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final MailjetClient mailjetClient;

    @Autowired
    public EmailService(MailjetClient mailjetClient) {
        this.mailjetClient = mailjetClient;
    }

    public void sendMailUsingMailjet() {
        try {
            MailjetRequest request = new MailjetRequest(Emailv31.resource)
                    .property(Emailv31.MESSAGES, new JSONArray()
                            .put(new JSONObject()
                                    .put(Emailv31.Message.FROM, new JSONObject()
                                            .put("Email", "valdemaras.gedziunas@stud.techin.lt")
                                            .put("Name", "Mailjet Pilot"))
                                    .put(Emailv31.Message.TO, new JSONArray()
                                            .put(new JSONObject()
                                                    .put("Email", "valdemaras.ged@gmail.com")
                                                    .put("Name", "passenger 1")))
                                    .put(Emailv31.Message.SUBJECT, "Your email flight plan!")
                                    .put(Emailv31.Message.TEXTPART, "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!")
                                    .put(Emailv31.Message.HTMLPART, "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!")));

            MailjetResponse response = mailjetClient.post(request);
            System.out.println(response.getStatus());
            System.out.println(response.getData());
        } catch (MailjetException e) {
            e.printStackTrace(); // Handle exception as needed
        }
    }
}


