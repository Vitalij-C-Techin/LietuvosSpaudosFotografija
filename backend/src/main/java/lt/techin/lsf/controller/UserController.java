package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.persistance.modal.User;
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
    public Object register() {
        return null;
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

    @GetMapping("/user/{id}")
    public Object getUser(
            @PathVariable Integer id
    ) {
        return "User id: " + id;
    }

    @GetMapping("/test")
    public Object testUser() {
        return "Test endpoint";
    }

    @GetMapping("/test/getUser")
    public User getUser(
            @RequestParam UUID uuid
    ) {
        User user = userService.findUserByUuid(uuid);

        return user;
    }
}