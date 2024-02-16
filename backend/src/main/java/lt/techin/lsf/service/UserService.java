package lt.techin.lsf.service;

import lombok.AllArgsConstructor;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.mapper.UserMapper;
import lt.techin.lsf.persistance.UserRepository;
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
}
