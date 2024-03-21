package lt.techin.lsf.controller;

import jakarta.validation.Valid;
import lt.techin.lsf.exception.UserNotRegisteredException;
import lt.techin.lsf.model.requests.AdminRegisterJuryRequest;
import lt.techin.lsf.model.requests.AdminRegisterUserRequest;
import lt.techin.lsf.model.requests.AdminUpdateUserIsActiveRequest;
import lt.techin.lsf.model.requests.AdminUpdateUserRoleRequest;
import lt.techin.lsf.model.response.UserCreationResponse;
import lt.techin.lsf.model.response.UserDataForListResponse;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.persistance.model.UserRecord;
import lt.techin.lsf.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("register/user")
    public ResponseEntity<UserCreationResponse> registerUser(
            @RequestBody @Valid AdminRegisterUserRequest registerUserAdminRequest
    ) {
        UserRecord registeredUser = adminService.registerUser(registerUserAdminRequest);

        if (registeredUser != null) {
            UserCreationResponse response = new UserCreationResponse("User created successfully.", registeredUser);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else {
            throw new UserNotRegisteredException("User not registered");
        }
    }

    @PostMapping("register/jury")
    public ResponseEntity<UserCreationResponse> registerJury(
            @RequestBody @Valid AdminRegisterJuryRequest registerJuryAdminRequest
    ) {
        UserRecord registeredJury = adminService.registerJury(registerJuryAdminRequest);

        if (registeredJury != null) {
            UserCreationResponse response = new UserCreationResponse("Jury created successfully.", registeredJury);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } else {
            throw new UserNotRegisteredException("User not registered.");
        }
    }

    @GetMapping("/user/{userUuid}")
    public UserResponse getUserDetails(
            @PathVariable UUID userUuid
    ) {

        return adminService.getUserByUuid(userUuid);
    }

    @GetMapping("/users")
    public Page<UserDataForListResponse> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "surname") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {

        return adminService.getAllUsers(page, size, sortBy, direction);
    }

    @PatchMapping("/user/{userUuid}/role")
    public UserResponse updateUserRole(
            @PathVariable UUID userUuid,
            @RequestBody @Valid AdminUpdateUserRoleRequest updateUserRoleRequest
    ) {

        return adminService.updateUserRole(userUuid, updateUserRoleRequest);
    }

    @PatchMapping("/user/{userUuid}/status")
    public UserResponse updateUserIsActive(
            @PathVariable UUID userUuid,
            @RequestBody @Valid AdminUpdateUserIsActiveRequest updateUserIsActiveRequest
    ) {

        return adminService.updateUserIsActive(userUuid, updateUserIsActiveRequest);
    }


}