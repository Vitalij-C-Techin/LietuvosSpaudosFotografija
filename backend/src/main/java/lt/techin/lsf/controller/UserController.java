package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user/{uuid}")
    public UserResponse getUserByUuid(
            @PathVariable UUID uuid
    ) {
        return UserResponseMapper.map(
                userService.findUserByUuid(uuid)
        );
    }
}