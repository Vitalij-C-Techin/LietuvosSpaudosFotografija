package lt.techin.lsf.service;

import lt.techin.lsf.exception.UserExistsException;
import lt.techin.lsf.exception.UserNotFoundException;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.mapper.UserDataForListMapper;
import lt.techin.lsf.model.mapper.UserRecordMapper;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.requests.AdminRegisterJuryRequest;
import lt.techin.lsf.model.requests.AdminRegisterUserRequest;
import lt.techin.lsf.model.requests.AdminUpdateUserIsActiveRequest;
import lt.techin.lsf.model.requests.AdminUpdateUserRoleRequest;
import lt.techin.lsf.model.response.UserDataForListResponse;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final String USER_EXISTS_MESSAGE = "User exists";
    private static final String USER_NOT_FOUND_MESSAGE = "User not found";

    @Autowired
    public AdminService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserRecord registerUser(AdminRegisterUserRequest registerUserAdminRequest) {

        if (userRepository.existsByEmail(registerUserAdminRequest.getEmail())) {
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

        if (userRepository.existsByEmail(registerJuryAdminRequest.getEmail())) {
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

    public UserResponse getUserByUuid(UUID userUuid) {

        UserRecord userDetails = userRepository.findById(userUuid)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND_MESSAGE));

        return UserResponseMapper.userRecordToUserResponse(userDetails);
    }

    public Page<UserDataForListResponse> getAllUsers(int pageNumber, int pageSize, String sortBy, String sortDirection) {

        Pageable pageable = PageRequest.of(pageNumber, pageSize, Sort.Direction.fromString(sortDirection), sortBy);
        Page<UserRecord> userPage = userRepository.findAll(pageable);

        return userPage.map(UserDataForListMapper::userRecordToUserResponseForList);
    }

    public UserResponse updateUserRole(UUID userUuid, AdminUpdateUserRoleRequest updateUserRoleRequest) {

        UserRecord userDetails = userRepository.findById(userUuid)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND_MESSAGE));

        User.Role givenRole = userDetails.getRole();
        User.Role updateRole = updateUserRoleRequest.getRole();

        if (!givenRole.equals(updateRole)) {
            userDetails.setRole(updateRole);
        }

        return UserResponseMapper.userRecordToUserResponse(userRepository.save(userDetails));
    }

    public UserResponse updateUserIsActive(UUID userUuid, AdminUpdateUserIsActiveRequest updateUserIsActiveRequest) {

        UserRecord userDetails = userRepository.findById(userUuid)
                .orElseThrow(() -> new UserNotFoundException(USER_NOT_FOUND_MESSAGE));

        boolean userIsActive = userDetails.isActive();
        boolean updateUserIsActive = updateUserIsActiveRequest.isActive();

        if(userIsActive != updateUserIsActive) {
            userDetails.setActive(updateUserIsActive);
        }

        return UserResponseMapper.userRecordToUserResponse(userRepository.save(userDetails));
    }
}
