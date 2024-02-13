package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.UserAuthentication;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.requests.AuthenticationRequest;
import lt.techin.lsf.model.requests.RegisterRequest;
import lt.techin.lsf.model.response.UserAuthenticationResponse;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.service.AuthenticationService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @GetMapping("/me")
    public UserResponse getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            return null;
        }

        return UserResponseMapper.map((User) authentication.getPrincipal());
    }

    @GetMapping("/login")
    public UserAuthenticationResponse login(
            @RequestBody AuthenticationRequest authenticationRequest
    ) {
        UserAuthentication userAuthentication = authenticationService.authentication(authenticationRequest);

        return userAuthentication.getUserAuthenticationResponse();
    }

    @PostMapping("/register")
    public UserAuthenticationResponse register(
            @RequestBody RegisterRequest registerRequest
    ) {
        UserAuthentication userAuthentication = authenticationService.register(registerRequest);

        return userAuthentication.getUserAuthenticationResponse();
    }

    @PostMapping("/forget-password")
    public Object forgetPassword() {
        //TODO
        return "forget password here";
    }

    @PostMapping("/change-password")
    public Object changePassword() {
        //TODO
        return "change password here";
    }
}
