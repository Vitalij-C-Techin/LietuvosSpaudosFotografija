package lt.techin.lsf.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import org.springframework.context.annotation.PropertySource;

@Getter
@Configuration
@PropertySource(
        ignoreResourceNotFound = false,
        value = "classpath:credentials.yaml")
public class MailjetConfiguration {

    @Value("${accessKey}")
    private String accessKey;

    @Value("${secretKey}")
    private String secretKey;

    @Bean
    public MailjetClient mailjetClient() {
        ClientOptions options = ClientOptions.builder()
                .apiKey(accessKey)
                .apiSecretKey(secretKey)
                .build();

        return new MailjetClient(options);
    }
}
