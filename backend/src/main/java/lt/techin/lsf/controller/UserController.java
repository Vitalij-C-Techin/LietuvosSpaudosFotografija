package lt.techin.lsf.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lt.techin.lsf.exception.UserNotFoundByUuidException;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.UserAuthentication;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.requests.UpdateUserRequest;
import lt.techin.lsf.model.response.UserAuthenticationResponse;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    @GetMapping("/user/{uuid}")
    public UserResponse getUserByUuid(
            @PathVariable UUID uuid) {
        User user = userService.findUserByUuid(uuid);

        if (null == user) {
            throw new UserNotFoundByUuidException("User not found");
        }

        return UserResponseMapper.map(user);
    }

    @PutMapping("/user/{uuid}/profile")
    public UserAuthenticationResponse updateUserProfile(
            @Valid @RequestBody UpdateUserRequest updateUserRequest, @PathVariable UUID uuid) {
        return userService.updateUserProfile(updateUserRequest, uuid);
    }
}