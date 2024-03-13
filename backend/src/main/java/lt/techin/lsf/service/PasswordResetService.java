package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.requests.ForgetPasswordRequest;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private final EmailService emailService;

    private final UserRepository userRepository;

    public ResponseEntity<String> resetPassword(ForgetPasswordRequest forgetPasswordRequest) {
        String email = forgetPasswordRequest.getEmail();
        if (userRepository.existsByEmail(email)) {
            UserRecord user = userRepository.findByEmailIgnoreCase(email);
            initializePasswordReset(user);
            userRepository.save(user);
            String emailMessage = EmailMessage.builder()
                    .passwordResetLink("http://localhost:5173/change-password?token="
                            + user.getPasswordResetToken())
                    .emailRecipient(user.getName()).build().getEmailMessage();
            emailService.sendMailUsingMailjet(email, "email reset link", emailMessage);
        }
        return new ResponseEntity<>("If the user exists in our database, an email link will be sent.",
                HttpStatus.ACCEPTED);
    }

    public void initializePasswordReset(UserRecord existingUser) {
        LocalDateTime now = LocalDateTime.now();
        existingUser.setPasswordResetRequestAt(now);
        String passwordResetToken = UUID.randomUUID().toString();
        existingUser.setPasswordResetToken(passwordResetToken);
    }
}
