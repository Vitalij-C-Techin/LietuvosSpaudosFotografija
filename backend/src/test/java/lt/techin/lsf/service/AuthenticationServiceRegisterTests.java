package lt.techin.lsf.service;

import jakarta.transaction.Transactional;
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