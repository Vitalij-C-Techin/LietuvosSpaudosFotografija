package lt.techin.lsf.controller;

import jakarta.validation.Valid;
import lt.techin.lsf.exception.UserNotRegisteredException;
import lt.techin.lsf.model.requests.AdminRegisterJuryRequest;
import lt.techin.lsf.model.requests.AdminRegisterUserRequest;
import lt.techin.lsf.model.response.UserCreationResponse;
import lt.techin.lsf.persistance.model.UserRecord;
import lt.techin.lsf.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/admin/register")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/user")
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

    @PostMapping("/jury")
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
}