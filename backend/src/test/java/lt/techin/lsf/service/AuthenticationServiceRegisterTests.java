package lt.techin.lsf.service;

import jakarta.transaction.Transactional;
import lt.techin.lsf.exception.*;
import lt.techin.lsf.model.UserAuthentication;
import lt.techin.lsf.model.requests.RegisterRequest;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class AuthenticationServiceRegisterTests {
    @Autowired
    public AuthenticationService authenticationService;

    @Autowired
    public UserRepository userRepository;

    @Test
    public void registrationNoData() {
        Assert.assertThrows(NullPointerException.class, () -> {
            authenticationService.register(null);
        });
    }

    @Test
    public void registrationDefaultData() {
        RegisterRequest reg = new RegisterRequest();

        Assert.assertThrows(UserRegistrationException.class, () -> {
            authenticationService.register(reg);
        });
    }

    @Test
    public void registrationWrongData() {
        RegisterRequest reg = new RegisterRequest();

        Assert.assertThrows(UserRegistrationException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("1");

        Assert.assertThrows(UserRegistrationException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPassword("1");

        Assert.assertThrows(UserRegistrationException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setName("1");

        Assert.assertThrows(UserRegistrationException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setSurname("1");

        Assert.assertThrows(UserRegistrationException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPhoneNumber("1");

        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });
    }

    @Test
    public void registrationEmailValidation() {
        RegisterRequest reg = RegisterRequest.builder()
                .email("")
                .password("")
                .name("")
                .surname("")
                .phoneNumber("")
                .build();

        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("01234567890123456789012345678901234567890123456789012345678901234567890123456789");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("email");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("surname");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("namesurname");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("namesurname@domain");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("namesurname@domain.");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("namesurname@domain.com");
        Assert.assertThrows(UserRegistrationPasswordIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("name.surname");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("name.surname@domain");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("name.surname@domain.");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("name.surname@domain.com");
        Assert.assertThrows(UserRegistrationPasswordIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("123123");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("123123.123123");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("123123.123123@domain.");
        Assert.assertThrows(UserRegistrationEmailInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setEmail("123123.123123@domain.com");
        Assert.assertThrows(UserRegistrationPasswordIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });
    }

    @Test
    public void registrationPasswordValidation() {
        RegisterRequest reg = RegisterRequest.builder()
                .email("name.surname@gmail.com")
                .password("")
                .name("")
                .surname("")
                .phoneNumber("")
                .build();

        Assert.assertThrows(UserRegistrationPasswordIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPassword("123123");
        Assert.assertThrows(UserRegistrationPasswordIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPassword("0123456789012345678901234567890123456789012345678901234567890123456789");
        Assert.assertThrows(UserRegistrationPasswordIsTooLongException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPassword("QWEQWEQWEQWEQWE");
        Assert.assertThrows(UserRegistrationPasswordFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPassword("qweqweqweqweqwe");
        Assert.assertThrows(UserRegistrationPasswordFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPassword("qweqweQWEqweqwe");
        Assert.assertThrows(UserRegistrationPasswordFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPassword("qweqweQWEqweqwe1");
        Assert.assertThrows(UserRegistrationPasswordFormatException.class, () -> {
            authenticationService.register(reg);
        });
    }

    @Test
    public void registrationNameValidation() {
        RegisterRequest reg = RegisterRequest.builder()
                .email("name.surname@gmail.com")
                .password("passwordPASSWORD123*")
                .name("")
                .surname("")
                .phoneNumber("")
                .build();

        Assert.assertThrows(UserRegistrationNameIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setName("N");
        Assert.assertThrows(UserRegistrationNameIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setName("_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio");
        Assert.assertThrows(UserRegistrationNameIsTooLongException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setName("Myname123");
        Assert.assertThrows(UserRegistrationNameInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setName("Myname");
        Assert.assertThrows(UserRegistrationSurnameIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });
    }

    @Test
    public void registrationSurnameValidation() {
        RegisterRequest reg = RegisterRequest.builder()
                .email("name.surname@gmail.com")
                .password("passwordPASSWORD123*")
                .name("Username")
                .surname("")
                .phoneNumber("")
                .build();

        Assert.assertThrows(UserRegistrationSurnameIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setSurname("S");
        Assert.assertThrows(UserRegistrationSurnameIsTooShortException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setSurname("_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio_qwertyuio");
        Assert.assertThrows(UserRegistrationSurnameIsTooLongException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setSurname("Mysurname123");
        Assert.assertThrows(UserRegistrationSurnameInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setSurname("Mysurname");
        Assert.assertThrows(UserRegistrationTooOldException.class, () -> {
            authenticationService.register(reg);
        });
    }

    @Test
    public void registrationBirthYearValidation() {
        RegisterRequest reg = RegisterRequest.builder()
                .email("name.surname@gmail.com")
                .password("passwordPASSWORD123*")
                .name("Username")
                .surname("Usersurname")
                .phoneNumber("")
                .build();

        Assert.assertThrows(UserRegistrationTooOldException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setBirthYear(1900);
        Assert.assertThrows(UserRegistrationTooOldException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setBirthYear(2022);
        Assert.assertThrows(UserRegistrationTooYoungException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setBirthYear(2050);
        Assert.assertThrows(UserRegistrationTooYoungException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setBirthYear(2010);
        Assert.assertThrows(UserRegistrationTooYoungException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setBirthYear(2000);
        Assert.assertThrows(UserRegistrationPhoneNumberInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });
    }

    @Test
    public void registrationPhoneNumberValidation() {
        RegisterRequest reg = RegisterRequest.builder()
                .email("name.surname@gmail.com")
                .password("passwordPASSWORD123*")
                .name("Username")
                .surname("Usersurname")
                .birthYear(2000)
                .phoneNumber("")
                .build();

        Assert.assertThrows(UserRegistrationPhoneNumberInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPhoneNumber("12");
        Assert.assertThrows(UserRegistrationPhoneNumberInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPhoneNumber("0123456789012345678901234567890123456789012345678901234567890123456789");
        Assert.assertThrows(UserRegistrationPhoneNumberInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPhoneNumber("123ABC");
        Assert.assertThrows(UserRegistrationPhoneNumberInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });

        reg.setPhoneNumber("123+123");
        Assert.assertThrows(UserRegistrationPhoneNumberInvalidFormatException.class, () -> {
            authenticationService.register(reg);
        });
    }

    @Test
    @Transactional
    public void registrationValidation() {
        String email = "name.surname.test@gmail.com";

        userRepository.deleteByEmail(email);

        RegisterRequest reg = RegisterRequest.builder()
                .email(email)
                .password("passwordPASSWORD123*")
                .name("Username")
                .surname("Usersurname")
                .birthYear(2000)
                .phoneNumber("+370684654684864")
                .mediaName("")
                .build();

        UserAuthentication userAuthentication = authenticationService.register(reg);

        Assert.assertNotNull(userAuthentication);
        Assert.assertNotNull(userAuthentication.getToken());
        Assert.assertNotNull(userAuthentication.getUser());
        Assert.assertEquals(email, userAuthentication.getUser().getEmail());


        UserRecord user = userRepository.findByEmailIgnoreCase(email);
        Assert.assertEquals(email, user.getEmail());

        userRepository.deleteByEmail(email);
    }
}