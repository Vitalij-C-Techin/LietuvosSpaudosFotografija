package lt.techin.lsf.service;

import lt.techin.lsf.persistance.modal.User;

import java.util.UUID;

public interface IUserService {

    User findUserByUuid(UUID uuid);

}
