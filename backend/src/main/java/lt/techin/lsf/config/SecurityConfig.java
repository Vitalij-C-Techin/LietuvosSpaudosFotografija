package lt.techin.lsf.config;

import lombok.RequiredArgsConstructor;
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
            "api/v1/competition/all/active/{page}",

            "swagger-ui/**", // Swagger
            "v3/api-docs/**" // Swagger
    };
    private final String[] publicPostEndpoints = {
            "api/v1/register",
            "api/v1/login",
            "api/v1/logout",
            "api/v1/forget-password",
            "api/v1/change-password"
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

                    //User, Moderator, Admin
                            request.requestMatchers(
                                    "api/v1/participation",
                                    "api/v1/participation/{uui}",

                                    "api/v1/competition/user/{page}",
                                    "api/v1/competition/user/participate/{page}"
                            ).hasAnyAuthority("USER","MODERATOR", "ADMIN");

                    //Moderator, Admin
                            request.requestMatchers(
                                    "api/v1/participation",
                                    "api/v1/participation/{uuid}",
                                    "api/v1/participation/all/pending/{page}",

                                    "api/v1/competition",
                                    "api/v1/competition/{uuid}",
                                    "api/v1/competition/all/{page}",
                                    "api/v1/competition/{uuid}/categories",

                                    "api/v1/category/**",
                                    "api/v1/admin/**"
                            ).hasAnyAuthority("MODERATOR", "ADMIN");

                            request.anyRequest().authenticated();
                        }

                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}