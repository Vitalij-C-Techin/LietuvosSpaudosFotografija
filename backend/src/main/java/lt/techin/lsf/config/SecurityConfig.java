package lt.techin.lsf.config;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final String[] publicGetEndpoints = {
            "api/v1/test",

            "swagger-ui/**", // Swagger
            "v3/api-docs/**" // Swagger
    };
    private final String[] publicPostEndpoints = {
            "api/v1/register",
            "api/v1/login",
            "api/v1/logout",
            "api/v1/forget-password",
            "api/v1/change-password",
            "api/v1/categories"
    };
    private final String[] publicPutEndpoints = {

    };
    private final String[] publicDeleteEndpoints = {

    };

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> {
                    //Public
                            request.requestMatchers(HttpMethod.GET, publicGetEndpoints).permitAll();
                            request.requestMatchers(HttpMethod.POST, publicPostEndpoints).permitAll();
                            request.requestMatchers(HttpMethod.PUT, publicPutEndpoints).permitAll();
                            request.requestMatchers(HttpMethod.DELETE, publicDeleteEndpoints).permitAll();

                    //Moderator, Admin
                            request.requestMatchers(
                                    "api/v1/competition",
                                    "api/v1/competition/{uuid}"
                            ).hasAnyAuthority("MODERATOR","ADMIN");

                            request.anyRequest().authenticated();
                        }

                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}