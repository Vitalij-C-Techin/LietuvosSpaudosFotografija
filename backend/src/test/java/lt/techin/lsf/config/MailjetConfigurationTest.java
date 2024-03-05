package lt.techin.lsf.config;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.PropertySource;

import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
@PropertySource("classpath:test-credentials.yaml")
public class MailjetConfigurationTest {


    @Value("${accessKey}")
    private String accessKey;

    @Value("${secretKey}")
    private String secretKey;

    @Autowired
    private MailjetConfiguration mailjetConfiguration;

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    void shouldBeMailjetConfigurationBean(){
        assertNotNull(applicationContext.getBean(MailjetConfiguration.class));
    }

    @Test
    void shouldLoadCredentialsFromFile(){
        Assertions.assertEquals(accessKey, mailjetConfiguration.getAccessKey());
        Assertions.assertEquals(secretKey, mailjetConfiguration.getSecretKey());
        assertNotNull(mailjetConfiguration.getAccessKey());
        assertNotNull(mailjetConfiguration.getSecretKey());
    }
}
