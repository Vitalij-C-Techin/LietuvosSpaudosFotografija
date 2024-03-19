package lt.techin.lsf.service;

import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
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
import org.springframework.security.authentication.*;
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

        if (null == authentication) {
            return null;
        }

        if (!authentication.isAuthenticated()) {
            return null;
        }

        return (User) authentication.getPrincipal();
    }

    public UserAuthentication authentication(@NonNull AuthenticationRequest request) {

        UserRecord userRecord = userRepository.findByEmailIgnoreCase(request.getEmail());

        if(!userRecord.isActive()) {
            throw new DisabledException("Account is disabled");
        }

        Authentication authentication = null;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (InternalAuthenticationServiceException e) {
            return null;
        }

        if (null == authentication) {
            return null;
        }

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

    public UserAuthentication register(@NotNull RegisterRequest register) {
        register.validateData();
        register.sanitizeData();

        if (userService.existsUserWithEmail(register.getEmail())) {
            throw new UserExistsException("User exists");
        }

        UserRecord userRecord = UserRecordMapper.map(register);
        userRecord.setupNewUser();

        userRecord.setPassword(
                passwordEncoder.encode(userRecord.getPassword())
        );
        userRecord.setDefaultRole();

        userRecord = userRepository.save(userRecord);

        User user = UserMapper.map(userRecord);
        String jwtToken = jwtService.generateToken(user);

        return UserAuthentication.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }
}
