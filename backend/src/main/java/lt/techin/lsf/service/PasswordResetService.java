package lt.techin.lsf.service;

import lt.techin.lsf.exception.UserNotFoundByEmailException;
import lt.techin.lsf.model.requests.ForgetPasswordRequest;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private EmailService emailService;

    private final UserRepository userRepository;

    public PasswordResetService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public ResponseEntity<String> resetPassword(ForgetPasswordRequest forgetPasswordRequest) {
        forgetPasswordRequest.validateData();
        String email = forgetPasswordRequest.getEmail();
        UserRecord user = userRepository.findByEmailIgnoreCase(email);
        if (user != null) {
            initializePasswordReset(user);
            userRepository.save(user);
            String emailChangeLink = "http://localhost:5173/change-password?token=" + user.getPasswordResetToken();
            emailService.sendMailUsingMailjet(email, "email reset link", emailChangeLink);
            return new ResponseEntity<>("Forget password request processed successfully", HttpStatus.ACCEPTED);

        } else {
            throw new UserNotFoundByEmailException("User not found for email: " + email);
        }
    }

    public void initializePasswordReset(UserRecord existingUser) {
            LocalDateTime now = LocalDateTime.now();
            existingUser.setPasswordResetRequestAt(now);
            String passwordResetToken = UUID.randomUUID().toString();
            existingUser.setPasswordResetToken(passwordResetToken);
    }
}

