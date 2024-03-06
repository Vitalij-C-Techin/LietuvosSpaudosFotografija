package lt.techin.lsf.controller;


import lt.techin.lsf.exception.UserNotFoundByEmailException;
import lt.techin.lsf.model.requests.ForgetPasswordRequest;
import lt.techin.lsf.persistance.model.UserRecord;
import lt.techin.lsf.service.ChangePasswordService;
import lt.techin.lsf.service.PasswordResetService;
import lt.techin.lsf.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthenticationControllerTests {

    @Mock
    private PasswordResetService passwordResetService;

    @Mock
    private ChangePasswordService changePasswordService;

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthenticationController authenticationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void forgetPassword_UserNotFound() {
        // Arrange
        ForgetPasswordRequest request = ForgetPasswordRequest.builder()
                .email("passwordresetmail@email.com")
                .build();
        ResponseEntity<String> notFoundResponse = new ResponseEntity<>(
                "User with email " + request.getEmail() + " not found!", HttpStatus.NOT_FOUND);
        when(passwordResetService.resetPassword(request)).thenReturn(notFoundResponse);

        // Act and Assert
       assertEquals(notFoundResponse, authenticationController.forgetPassword(request));
        verify(passwordResetService, times(1)).resetPassword(request);
    }

    @Test
    void changePassword_Success() {
        // Arrange
        String token = "someToken";
        UserRecord userRecord = new UserRecord();
        ResponseEntity<String> successResponse = new ResponseEntity<>("Password changed successfully", HttpStatus.NO_CONTENT);
        when(changePasswordService.changeUserPassword(token, userRecord.getPassword())).thenReturn(successResponse);

        // Act
        ResponseEntity<String> response = authenticationController.changePassword(token, userRecord);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertEquals("Password changed successfully", response.getBody());
        verify(changePasswordService, times(1)).changeUserPassword(token, userRecord.getPassword());
    }

    @Test
    void changePassword_Failure() {
        // Arrange
        String token = "someToken";
        UserRecord userRecord = new UserRecord();
        ResponseEntity<String> successResponse =
                new ResponseEntity<>("Failed to change password. Please try again.", HttpStatus.BAD_REQUEST);
        when(changePasswordService.changeUserPassword(token, userRecord.getPassword())).thenReturn(successResponse);

        // Act
        ResponseEntity<String> response = authenticationController.changePassword(token, userRecord);

        // Assert
        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Failed to change password. Please try again.", response.getBody());
        verify(changePasswordService, times(1)).changeUserPassword(token, userRecord.getPassword());
    }
}