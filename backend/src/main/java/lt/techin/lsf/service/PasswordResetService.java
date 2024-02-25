package lt.techin.lsf.service;

import lt.techin.lsf.model.requests.ForgetPasswordRequest;
import lt.techin.lsf.model.updater.PasswordResetUpdater;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PasswordResetService {

    @Autowired
    private EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(PasswordResetService.class);

    private final UserRepository userRepository;
    private final PasswordResetUpdater passwordResetUpdater;

    public PasswordResetService(UserRepository userRepository, PasswordResetUpdater passwordResetUpdater) {
        this.userRepository = userRepository;
        this.passwordResetUpdater = passwordResetUpdater;
    }

    public UserRecord userSearchByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email);
    }

    public void resetPassword(ForgetPasswordRequest forgetPasswordRequest) {
        forgetPasswordRequest.validateData();
        String email = forgetPasswordRequest.getEmail();
        UserRecord user = userSearchByEmail(email);
        if (user != null) {

            logger.info("Request received to reset password for email: {}", email);

            logger.info("Password reset initiated for email: {}", email);
            passwordResetUpdater.initializePasswordReset(user);
            userRepository.save(user);
            emailService.sendMailUsingMailjet(email);

            logger.info("Password reset initiated for user: {}", email);
        } else {
            logger.warn("User not found for email: {}", email);
        }
    }
}

