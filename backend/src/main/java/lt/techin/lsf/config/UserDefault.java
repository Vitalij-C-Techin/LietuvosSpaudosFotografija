package lt.techin.lsf.config;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.User;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDefault implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(ApplicationArguments args) {
        createUser();
        createJury();
        createModerator();
        createAdmin();
    }

    public void createUser() {
        UserRecord user = UserRecord.builder()
                .name("User")
                .surname("UserSurname")
                .phoneNumber("+37060000000")
                .birthYear(2000)
                .email("user@mail.com")
                .password(passwordEncoder.encode("qweQWE123!"))
                .role(User.Role.USER)
                .build();

        user.setupNewUser();

        if (null == userRepository.findByEmailIgnoreCase(user.getEmail())) {
            userRepository.save(user);
        }
    }

    public void createJury() {
        UserRecord user = UserRecord.builder()
                .name("Jury")
                .surname("JurySurname")
                .phoneNumber("+37060000000")
                .birthYear(2000)
                .email("jury@mail.com")
                .password(passwordEncoder.encode("qweQWE123!"))
                .role(User.Role.JURY)
                .build();

        user.setupNewUser();

        if (null == userRepository.findByEmailIgnoreCase(user.getEmail())) {
            userRepository.save(user);
        }
    }

    public void createModerator() {
        UserRecord user = UserRecord.builder()
                .name("Moderator")
                .surname("ModSurname")
                .phoneNumber("+37060000000")
                .birthYear(2000)
                .email("moderator@mail.com")
                .password(passwordEncoder.encode("qweQWE123!"))
                .role(User.Role.MODERATOR)
                .build();

        user.setupNewUser();

        if (null == userRepository.findByEmailIgnoreCase(user.getEmail())) {
            userRepository.save(user);
        }

    }

    public void createAdmin() {
        UserRecord user = UserRecord.builder()
                .name("Admin")
                .surname("AdminSurname")
                .phoneNumber("+37060000000")
                .birthYear(2000)
                .email("admin@mail.com")
                .password(passwordEncoder.encode("qweQWE123!"))
                .role(User.Role.ADMIN)
                .build();

        user.setupNewUser();

        if (null == userRepository.findByEmailIgnoreCase(user.getEmail())) {
            userRepository.save(user);
        }
    }
}
