package lt.techin.lsf.service;

import lt.techin.lsf.exception.UserExistsException;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.mapper.UserRecordMapper;
import lt.techin.lsf.model.requests.AdminRegisterJuryRequest;
import lt.techin.lsf.model.requests.AdminRegisterUserRequest;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    private static final String USER_EXISTS_MESSAGE = "User exists";

    @Autowired
    public AdminService(UserRepository userRepository, UserService userService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    public UserRecord registerUser(AdminRegisterUserRequest registerUserAdminRequest) {

        if (userService.existsUserWithEmail(registerUserAdminRequest.getEmail())) {
            throw new UserExistsException(USER_EXISTS_MESSAGE);
        }

        UserRecord userRecord = UserRecordMapper.mapAdminRegistration(registerUserAdminRequest);
        userRecord.setupNewUser();
        userRecord.setPassword(
                passwordEncoder.encode(userRecord.getPassword())
        );

        return userRepository.save(userRecord);
    }

    public UserRecord registerJury(AdminRegisterJuryRequest registerJuryAdminRequest) {

        if (userService.existsUserWithEmail(registerJuryAdminRequest.getEmail())) {
            throw new UserExistsException(USER_EXISTS_MESSAGE);
        }

        UserRecord userRecord = UserRecordMapper.mapAdminRegistration(registerJuryAdminRequest);
        userRecord.setupNewUser();
        userRecord.setRole(User.Role.JURY);
        userRecord.setPassword(
                passwordEncoder.encode(userRecord.getPassword())
        );

        return userRepository.save(userRecord);
    }
}
