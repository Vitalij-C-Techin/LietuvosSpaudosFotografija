package lt.techin.lsf.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.requests.AdminRegisterJuryRequest;
import lt.techin.lsf.model.requests.AdminRegisterUserRequest;
import lt.techin.lsf.persistance.model.UserRecord;
import lt.techin.lsf.service.AdminService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.UUID;
import java.util.stream.Stream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AdminControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private AdminService serviceMock;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "ADMIN")
    void registerUser() throws Exception {

        AdminRegisterUserRequest mockRequest = AdminRegisterUserRequest.builder()
                .role(User.Role.USER)
                .name("Name")
                .surname("Surname")
                .email("email@email.com")
                .password("Qwerty1*")
                .birthYear(1999)
                .phoneNumber("+3706345876")
                .mediaName("Media")
                .build();

        UserRecord mockUserRecord = UserRecord.builder()
                .role(mockRequest.getRole())
                .name(mockRequest.getName())
                .surname(mockRequest.getSurname())
                .email(mockRequest.getEmail())
                .password(passwordEncoder.encode(mockRequest.getPassword()))
                .birthYear(mockRequest.getBirthYear())
                .phoneNumber(mockRequest.getPhoneNumber())
                .mediaName(mockRequest.getMediaName())
                .build()
                .setupNewUser();

        given(serviceMock.registerUser(any(AdminRegisterUserRequest.class))).willReturn(mockUserRecord);

        mvc.perform(post("http://localhost:8080/api/v1/admin/register/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockRequest)))
                .andExpect(status().isCreated());

        verify(serviceMock, times(1)).registerUser(any(AdminRegisterUserRequest.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void registerJury() throws Exception {

        AdminRegisterJuryRequest mockRequest = AdminRegisterJuryRequest.builder()
                .name("Name")
                .surname("Surname")
                .email("email@email.com")
                .password("Qwerty1*")
                .build();

        UserRecord mockJuryRecord = UserRecord.builder()
                .role(User.Role.JURY)
                .name(mockRequest.getName())
                .surname(mockRequest.getSurname())
                .email(mockRequest.getEmail())
                .password(passwordEncoder.encode(mockRequest.getPassword()))
                .build()
                .setupNewUser();

        given(serviceMock.registerJury(any(AdminRegisterJuryRequest.class))).willReturn(mockJuryRecord);

        mvc.perform(post("http://localhost:8080/api/v1/admin/register/jury")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockRequest)))
                .andExpect(status().isCreated());

        verify(serviceMock, times(1)).registerJury(any(AdminRegisterJuryRequest.class));
    }

    @ParameterizedTest
    @MethodSource("invalidUserRequests")
    @WithMockUser(roles = "ADMIN")
    void invalidUserRegistration(AdminRegisterUserRequest request) throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/api/v1/admin/register/user")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    static Stream<AdminRegisterUserRequest> invalidUserRequests() {
        return Stream.of(
                // Invalid role
                AdminRegisterUserRequest.builder()
                        .role(null)
                        .name("")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid name
                AdminRegisterUserRequest.builder()
                        .role(User.Role.USER)
                        .name("")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid surname
                AdminRegisterUserRequest.builder()
                        .role(User.Role.USER)
                        .name("Name")
                        .surname("S")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid email
                AdminRegisterUserRequest.builder()
                        .role(User.Role.USER)
                        .name("Name")
                        .surname("Surname")
                        .email("email@email")
                        .password("Qwerty1*")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid password
                AdminRegisterUserRequest.builder()
                        .role(User.Role.USER)
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty")
                        .birthYear(1999)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                // Invalid birth year
                AdminRegisterUserRequest.builder()
                        .role(User.Role.USER)
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1800)
                        .phoneNumber("+3706345876")
                        .mediaName("Media")
                        .build(),
                //Invalid phone
                AdminRegisterUserRequest.builder()
                        .role(User.Role.USER)
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1800)
                        .phoneNumber("+370")
                        .mediaName("Media")
                        .build(),
                //Invalid media name
                AdminRegisterUserRequest.builder()
                        .role(User.Role.USER)
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .birthYear(1800)
                        .phoneNumber("+3706345876")
                        .mediaName("MediaMediaMediaMediaMediaMediaMediaMediaMediaMediaMediaMedia")
                        .build()
        );
    }

    @ParameterizedTest
    @MethodSource("invalidJuryRequests")
    @WithMockUser(roles = "ADMIN")
    void invalidJuryRegistration(AdminRegisterJuryRequest request) throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/api/v1/admin/register/jury")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    static Stream<AdminRegisterJuryRequest> invalidJuryRequests() {
        return Stream.of(
                //Invalid name
                AdminRegisterJuryRequest.builder()
                        .name("N")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .build(),
                //Invalid surname
                AdminRegisterJuryRequest.builder()
                        .name("Name")
                        .surname("1")
                        .email("email@email.com")
                        .password("Qwerty1*")
                        .build(),
                //Invalid email
                AdminRegisterJuryRequest.builder()
                        .name("Name")
                        .surname("Surname")
                        .email("email")
                        .password("Qwerty1*")
                        .build(),
                //Invalid password
                AdminRegisterJuryRequest.builder()
                        .name("Name")
                        .surname("Surname")
                        .email("email@email.com")
                        .password("qwerty1*")
                        .build()
        );
    }

    @ParameterizedTest
    @CsvSource({
            "USER, 200",
            "ADMIN, 200",
            "MODERATOR, 200",
            "JURY, 200",
            ", 400"
    })
    @WithMockUser(roles = "ADMIN")
    void updateUserRoleTest(User.Role role, int expectedStatus) throws Exception {
        UUID userUuid = UUID.randomUUID();
        String requestBody = "{\"role\": \"" + role + "\"}";

        mvc.perform(MockMvcRequestBuilders.patch("http://localhost:8080/api/v1/admin/user/" + userUuid + "/role")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().is(expectedStatus));
    }

    @ParameterizedTest
    @CsvSource({
            "'true', 200",
            "'false', 200",
            "'invalid', 400"
    })
    @WithMockUser(roles = "ADMIN")
    void updateUserIsActiveTest(String isActive, int expectedStatus) throws Exception {
        UUID userUuid = UUID.randomUUID();
        String requestBody = "{\"is_active\": " + isActive + "}";

        mvc.perform(MockMvcRequestBuilders.patch("http://localhost:8080/api/v1/admin/user/" + userUuid + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().is(expectedStatus));
    }
}