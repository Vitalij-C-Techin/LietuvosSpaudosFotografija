package lt.techin.lsf.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.techin.lsf.exception.UserNotAuthenticatedException;
import lt.techin.lsf.exception.UserNotRegisteredException;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.UserAuthentication;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.requests.AuthenticationRequest;
import lt.techin.lsf.model.requests.ForgetPasswordRequest;
import lt.techin.lsf.model.requests.RegisterRequest;
import lt.techin.lsf.model.response.UserAuthenticationResponse;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.persistance.model.UserRecord;
import lt.techin.lsf.service.AuthenticationService;
import lt.techin.lsf.service.ChangePasswordService;
import lt.techin.lsf.service.PasswordResetService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final PasswordResetService passwordResetService;
    private final ChangePasswordService changePasswordService;


    @GetMapping("/me")
    public UserResponse getUser() {
        User user = authenticationService.getAuthenticatedUser();

        if (null == user) {
            throw new UserNotAuthenticatedException("User not found");
        }

        return UserResponseMapper.map(user);
    }


    @PostMapping("/login")
    public UserAuthenticationResponse login(
            @RequestBody AuthenticationRequest authenticationRequest
    ) {
        UserAuthentication userAuthentication = authenticationService.authentication(authenticationRequest);

        if (null == userAuthentication) {
            throw new BadCredentialsException("User credentials incorrect");
        }

        return userAuthentication.getUserAuthenticationResponse();
    }

    @PostMapping("/register")
    public UserAuthenticationResponse register(
            @RequestBody RegisterRequest registerRequest
    ) {
        UserAuthentication userAuthentication = authenticationService.register(registerRequest);

        if (null == userAuthentication) {
            throw new UserNotRegisteredException("User not registered");
        }

        return userAuthentication.getUserAuthenticationResponse();
    }

    @PostMapping("/forget-password")
    public ResponseEntity<String> forgetPassword(@Valid @RequestBody ForgetPasswordRequest forgetPasswordRequest) {
        return passwordResetService.resetPassword(forgetPasswordRequest);
    }

    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestParam String token, @RequestBody UserRecord userRecord) {
        return changePasswordService.changeUserPassword(token, userRecord.getPassword());
    }
}

