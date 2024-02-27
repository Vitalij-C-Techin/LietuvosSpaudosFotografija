package lt.techin.lsf.service;

import lt.techin.lsf.exception.UserNotFoundByEmailException;
import lt.techin.lsf.model.requests.ForgetPasswordRequest;
import lt.techin.lsf.model.updater.PasswordResetUpdater;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetService {

    @Autowired
    private EmailService emailService;

    private final UserRepository userRepository;
    private final PasswordResetUpdater passwordResetUpdater;

    public PasswordResetService(UserRepository userRepository, PasswordResetUpdater passwordResetUpdater) {
        this.userRepository = userRepository;
        this.passwordResetUpdater = passwordResetUpdater;
    }

    public UserRecord userSearchByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }

    public ResponseEntity<String> resetPassword(ForgetPasswordRequest forgetPasswordRequest) {
        forgetPasswordRequest.validateData();
        String email = forgetPasswordRequest.getEmail();
        UserRecord user = userSearchByEmail(email);
        if (user != null) {

            passwordResetUpdater.initializePasswordReset(user);
            userRepository.save(user);
            String emailChangeLink = "http://localhost:5173/change-password?token=" + user.getPasswordResetToken();
            emailService.sendMailUsingMailjet(email, "email reset link", emailChangeLink);
            return new ResponseEntity<>("Forget password request processed successfully", HttpStatus.ACCEPTED);

        } else {
            throw new UserNotFoundByEmailException("User not found");
        }
    }
}

