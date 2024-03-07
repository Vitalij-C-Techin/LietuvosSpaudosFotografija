package lt.techin.lsf.service;

import lombok.AllArgsConstructor;
import lt.techin.lsf.exception.UserNotFoundByUuidException;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.mapper.UserMapper;
import lt.techin.lsf.model.requests.UpdateUserRequest;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.model.UserRecord;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Override
    public User findUserByUuid(UUID uuid) {
        return UserMapper.map(
                userRepository.findByUuidAllIgnoreCase(uuid)
        );
    }

    @Override
    public boolean existsUserWithUuid(UUID uuid) {
        return userRepository.existsByUuid(uuid);
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


    public ResponseEntity<String> updateUserProfile(UpdateUserRequest updateUserRequest, UUID uuid) {
        if (userRepository.findByUuidAllIgnoreCase(uuid) == null) {
            throw new UserNotFoundByUuidException("User not found");
        }
        else {
            UserRecord existingUser = userRepository.findByUuidAllIgnoreCase(uuid);
            existingUser.setEmail(updateUserRequest.getEmail());
            existingUser.setName(updateUserRequest.getName());
            existingUser.setSurname(updateUserRequest.getSurname());
            existingUser.setPhoneNumber(updateUserRequest.getPhoneNumber());
            existingUser.setBirthYear(updateUserRequest.getBirthYear());
            existingUser.setMediaName(updateUserRequest.getMediaName());

            userRepository.save(existingUser);
            return new ResponseEntity<>("User updated", HttpStatus.OK);

        }
    }
}
