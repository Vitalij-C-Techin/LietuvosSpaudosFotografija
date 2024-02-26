package lt.techin.lsf.service;

import lombok.*;
import lt.techin.lsf.exception.TokenExpiredException;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Getter
@Setter
@Service
public class ChangePasswordService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public ChangePasswordService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public void changeUserPassword(String passwordResetTokenUuid, String newPassword) {
        UserRecord userRecord = userRepository.findByPasswordResetToken(passwordResetTokenUuid);
        if (userRecord != null) {
            validatePasswordTokenExpiration(userRecord.getPasswordResetRequestAt());
            userRecord.setPassword(
                    passwordEncoder.encode(newPassword)
            );
            userRepository.save(userRecord);
        }
    }

    public void validatePasswordTokenExpiration(LocalDateTime tokenCreationDateTime) {
        LocalDateTime localDateTimeNow = LocalDateTime.now();
        if (localDateTimeNow.isAfter(tokenCreationDateTime.plusHours(1))) {
            throw new TokenExpiredException("Token is expired");
        }
    }
}

