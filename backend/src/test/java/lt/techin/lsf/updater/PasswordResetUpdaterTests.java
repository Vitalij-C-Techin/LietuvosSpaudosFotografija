package lt.techin.lsf.updater;

import lt.techin.lsf.model.updater.PasswordResetUpdater;
import lt.techin.lsf.persistance.model.UserRecord;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class PasswordResetUpdaterTests {

    @MockBean
    private PasswordResetUpdater passwordResetUpdater;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void initializePasswordReset_ShouldInitializePasswordResetProperties() {
        // Arrange
        UserRecord existingUser = mock(UserRecord.class);

        // Act
        passwordResetUpdater.initializePasswordReset(existingUser);

        // Assert
        assertNotNull(existingUser.getPasswordResetRequestAt());

        assertNotNull(existingUser.getPasswordResetToken());

        assertEquals(LocalDateTime.now().getDayOfMonth(), existingUser.getPasswordResetRequestAt().getDayOfMonth());
    }

    @Test
    void initializePasswordReset_ShouldNotThrowExceptionWithNullUserRecord() {
        // Act and Assert
        passwordResetUpdater.initializePasswordReset(null);
    }
}
