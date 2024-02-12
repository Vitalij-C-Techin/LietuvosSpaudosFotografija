package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.mapper.UserMapper;
import lt.techin.lsf.model.mapper.UserRecordMapper;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.requests.RegisterRequest;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/login")
    public Object login() {
        return null;
    }

    @GetMapping("/logout")
    public Object logout() {
        return null;
    }

    @PostMapping("/register")
    public UserResponse register(
            @RequestBody RegisterRequest registerRequest
    ) {
        return UserResponseMapper.map(
                userService.register(registerRequest)
        );
    }

    @PostMapping("/forget-password")
    public Object forgetPassword() {
        return null;
    }

    @PostMapping("/change-password")
    public Object changePassword() {
        return null;
    }

    @GetMapping("/user")
    public Object getLoggedUser() {
        return null;
    }

    @GetMapping("/user/{uuid}")
    public UserResponse getUserByUuid(
            @PathVariable UUID uuid
    ) {
        return UserResponseMapper.map(
                userService.findUserByUuid(uuid)
        );
    }
}