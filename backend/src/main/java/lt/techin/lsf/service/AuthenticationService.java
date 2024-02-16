package lt.techin.lsf.service;

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
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication instanceof AnonymousAuthenticationToken) {
            return null;
        }

        return (User) authentication.getPrincipal();
    }

    public UserAuthentication authentication(AuthenticationRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        if (!authentication.isAuthenticated()) {
            return null;
        }

        User user = userService.findUserByEmail(request.getEmail());
        String jwtToken = jwtService.generateToken(user);

        return UserAuthentication.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }

    public UserAuthentication register(RegisterRequest register) {
        register.sanitizeData();
        register.validateData();

        if (userService.existsUserWithEmail(register.getEmail())) {
            throw new UserExistsException("User exists");
        }

        UserRecord userRecord = UserRecordMapper.map(register);
        userRecord.setupNewUser();

        userRecord.setPassword(
                passwordEncoder.encode(userRecord.getPassword())
        );

        userRecord = userRepository.save(userRecord);

        User user = UserMapper.map(userRecord);
        String jwtToken = jwtService.generateToken(user);

        return UserAuthentication.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }
}
