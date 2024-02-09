package lt.techin.lsf.service;

import lombok.AllArgsConstructor;
import lt.techin.lsf.persistance.UserRepository;
import lt.techin.lsf.persistance.modal.User;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService implements IUserService{

    private UserRepository userRepository;

    @Override
    public User findUserByUuid(UUID uuid) {

        User user = userRepository.findByUuidAllIgnoreCase(uuid);

        return user;
    }
}
