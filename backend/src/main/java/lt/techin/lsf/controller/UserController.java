package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.exception.UserNotFoundByUuidException;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user/{uuid}")
    public UserResponse getUserByUuid(
            @PathVariable String uuid
    ) {
        User user = userService.findUserByUuid(
                UUID.fromString(uuid)
        );

        if (null == user) {
            throw new UserNotFoundByUuidException("User not found");
        }

        return UserResponseMapper.map(user);
    }
}