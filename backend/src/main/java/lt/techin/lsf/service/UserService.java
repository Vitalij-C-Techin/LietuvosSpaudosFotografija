package lt.techin.lsf.service;

import lombok.AllArgsConstructor;
import lt.techin.lsf.exception.UserExistsException;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.mapper.UserMapper;
import lt.techin.lsf.model.mapper.UserRecordMapper;
import lt.techin.lsf.model.requests.RegisterRequest;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements IUserService {

    private UserRepository userRepository;

    @Override
    public User findUserByUuid(UUID uuid) {
        return UserMapper.map(
                userRepository.findByUuidAllIgnoreCase(uuid)
        );
    }

    @Override
    public User findUserByEmail(String email) {
        return UserMapper.map(
                userRepository.findByEmailIgnoreCase(email)
        );
    }

    @Override
    public boolean existsUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User register(RegisterRequest registerRequest) {
        //TODO Sanitize data;
        //TODO validate data;

        if (existsUserWithEmail(registerRequest.getEmail())) {
            throw new UserExistsException("Email is already in use");
        }

        UserRecord userRecord = UserRecordMapper.map(registerRequest);

        return UserMapper.map(
                userRepository.save(userRecord)
        );
    }
}
