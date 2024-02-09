package lt.techin.lsf.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(Customizer.withDefaults())
                .authorizeHttpRequests(authorize -> {
                            authorize
                                    .requestMatchers(
                                            "api/v1/login",
                                            "api/v1/logout",
                                            "api/v1/register",
                                            "api/v1/forget-password",
                                            "api/v1/change-password",
                                            "api/v1/user"
                                    ).permitAll();

                            authorize
                                    .anyRequest()
                                    .authenticated();
                        }
                )
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}