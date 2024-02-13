package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/user")
    public Object getLoggedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        System.out.println("user endpoint here");

        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            String currentUserName = authentication.getName();

            System.out.println("user name here");
            System.out.println(currentUserName);

            //return currentUserName;
            return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        }

        System.out.println("user endpoint end");


        return "not found";
        // return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @GetMapping("/user/{uuid}")
    public UserResponse getUserByUuid(
            @PathVariable UUID uuid
    ) {
        return UserResponseMapper.map(
                userService.findUserByUuid(uuid)
        );
    }

    @GetMapping("/test")
    public Object test(
            @RequestParam String uuid
    ) {
        return "User public uuid = " + uuid;
    }

    @GetMapping("/test-private")
    public Object testPrivate(
            @RequestParam String uuid
    ) {
        return "User private uuid = " + uuid;
    }
}