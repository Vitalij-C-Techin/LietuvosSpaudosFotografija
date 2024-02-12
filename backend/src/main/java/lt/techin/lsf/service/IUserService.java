package lt.techin.lsf.service;

import lt.techin.lsf.model.User;

import java.util.UUID;

public interface IUserService {

    User findUserByUuid(UUID uuid);

    User findUserByEmail(String email);

    boolean existsUserWithEmail(String email);

}
