package lt.techin.lsf.service;

import lombok.*;
import lt.techin.lsf.exception.*;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

@Getter
@Setter
@Service
@RequiredArgsConstructor
public class ChangePasswordService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public ResponseEntity<String> changeUserPassword(String passwordResetTokenUuid, String newPassword) {
        UserRecord userRecord = userRepository.findByPasswordResetToken(passwordResetTokenUuid);
        if (userRecord != null && newPassword != null) {
            validatePasswordTokenExpiration(userRecord.getPasswordResetRequestAt());
            validatePassword(newPassword);
            userRecord.setPassword(
                    passwordEncoder.encode(newPassword)
            );
            userRecord.setPasswordResetToken(null);
            userRecord.setPasswordResetRequestAt(null);
            userRepository.save(userRecord);
            return new ResponseEntity<>("Password changed successfully", HttpStatus.ACCEPTED);
        }
        else {
            return new ResponseEntity<>("Failed to change password. Please try again.", HttpStatus.BAD_REQUEST);
        }
    }

    public void validatePasswordTokenExpiration(LocalDateTime tokenCreationDateTime) {
        LocalDateTime localDateTimeNow = LocalDateTime.now();
        if (localDateTimeNow.isAfter(tokenCreationDateTime.plusHours(1))) {
            throw new TokenExpiredException("Token is expired");
        }
    }

    public void validatePassword(String password){
        if (password.length() < 8) {
            throw new UserRegistrationPasswordIsTooShortException("Password is too short");
        }

        if (password.length() > 50) {
            throw new UserRegistrationPasswordIsTooLongException("Password is too long");
        }

        if (!Pattern.matches("^(?!.*\\s)(?=.*[A-Z])(?=.*\\d)(?=.*[a-z])(?=.*[!@#$%^&*()]).+$", password)) {
            throw new UserRegistrationPasswordFormatException("Password must contain only lowercase, " +
                    "uppercase latin letters, numbers and special symbols !@#$%^&*()");
        }

    }
}

