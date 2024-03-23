package lt.techin.lsf.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.UserAuthentication;
import lt.techin.lsf.model.requests.RegisterRequest;
import lt.techin.lsf.service.AuthenticationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Stream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class AuthenticationControllerRegisterTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AuthenticationService mockAuthenticationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void validUserRegistration() throws Exception {

        RegisterRequest mockRequest = RegisterRequest.builder()
                .name("Name")
                .surname("Surname")
                .email("email@email.com")
                .password("Qwerty1*")
                .birthYear(1999)
                .phoneNumber("+3706345876")
                .mediaName("Media")
                .build();

        UserAuthentication mockUserAuthentication = UserAuthentication.builder()
                .token("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYW1lc3VybmFtZUBkb21haW4uY29tIiwiaWF0IjoxNzExMTkxNTYxLCJleHAiOjE3MTEyNzc5NjF9.wAqEn2NISPPhwq3KRKUQgs9L536YG_TlrzXZe8pbd5E")
                .user(User.builder()
                        .uuid(UUID.randomUUID())
                        .name(mockRequest.getName())
                        .surname(mockRequest.getSurname())
                        .email(mockRequest.getEmail())
                        .password(passwordEncoder.encode(mockRequest.getPassword()))
                        .birthYear(mockRequest.getBirthYear())
                        .phoneNumber(mockRequest.getPhoneNumber())
                        .mediaName(mockRequest.getMediaName())
                        .role(User.Role.USER)
                        .isActive(true)
                        .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                        .build())
                .build();

        given(mockAuthenticationService.register(any(RegisterRequest.class))).willReturn(mockUserAuthentication);

        mvc.perform(post("http://localhost:8080/api/v1/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockRequest)))
                .andExpect(status().isOk());

        verify(mockAuthenticationService, times(1)).register(any(RegisterRequest.class));
    }

    @ParameterizedTest
    @MethodSource("invalidUserRequests")
    void invalidUserRegistration(RegisterRequest request) throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/api/v1/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    static Stream<RegisterRequest> invalidUserRequests() {
        return Stream.of(
                // Invalid name
                RegisterRequest.builder()
                        .name("")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid surname
                RegisterRequest.builder()
                        .name("Name")
                        .surname("S")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid email
                RegisterRequest.builder()
                        .name("Name")
                        .surname("Surname")
                        .email("email@email")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid password
                RegisterRequest.builder()
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid birth year
                RegisterRequest.builder()
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1800)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                //Invalid phone
                RegisterRequest.builder()
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+370")
                        .mediaName("Media")
                        .build(),
                //Invalid media name
                RegisterRequest.builder()
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("MediaMediaMediaMediaMediaMediaMediaMediaMediaMediaMediaMedia")
                        .build()
        );
    }
}