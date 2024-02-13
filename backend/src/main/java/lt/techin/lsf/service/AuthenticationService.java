package lt.techin.lsf.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lt.techin.lsf.exception.UserExistsException;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.UserAuthentication;
import lt.techin.lsf.model.mapper.UserMapper;
import lt.techin.lsf.model.mapper.UserRecordMapper;
import lt.techin.lsf.model.requests.AuthenticationRequest;
import lt.techin.lsf.model.requests.RegisterRequest;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements LogoutHandler {
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public UserAuthentication authentication(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
        ));

        //Break;

        User user = userService.findUserByEmail(request.getEmail());
        String jwtToken = jwtService.generateToken(user);

        return UserAuthentication.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }

    public UserAuthentication register(RegisterRequest register) {
        //TODO Sanitize data;
        //TODO validate data;
        //passwordEncoder.encode(registerRequest.getPassword());

        if (userService.existsUserWithEmail(register.getEmail())) {
            throw new UserExistsException("Email is already in use");
        }

        UserRecord userRecord = UserRecordMapper.map(register);
        userRecord.setupNewUser();

        userRecord.setPassword(passwordEncoder.encode(userRecord.getPassword()));

        userRecord = userRepository.save(userRecord);

        User user = UserMapper.map(userRecord);
        String jwtToken = jwtService.generateToken(user);

        return UserAuthentication.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {

    }
}
