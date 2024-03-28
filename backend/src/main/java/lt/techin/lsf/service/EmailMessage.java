package lt.techin.lsf.service;

import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailMessage {

    private String passwordResetLink;
    private String emailRecipient;

    public String getEmailMessage() {
        String emailMessage = """
                <html>
                <body>
                <p>Dear [User],</p>
                <p>You are receiving this email because a request was made to reset the password for your account. If you did not initiate this request, please disregard this email.</p>
                <p>To reset your password, please click on the following link:</p>
                <p><a href="[Reset Password Link]">Reset Password Link</a></p>
                <p>If the link does not work, please copy and paste the following URL into your web browser:</p>
                <p>[URL]</p>
                <p>Once you have reset your password, you can log in to your account using your new password.</p>
                <p>If you have any questions or need further assistance, please do not hesitate to contact our support team at [Support Email].</p>
                <p>Thank you,</p>
                <p>[Your Company Name] Team</p>
                </body>
                </html>""";

        return emailMessage.replace("[User]", emailRecipient)
                .replace("[URL]", passwordResetLink)
                .replace("[Your Company Name]", "LSF");


    }
}
