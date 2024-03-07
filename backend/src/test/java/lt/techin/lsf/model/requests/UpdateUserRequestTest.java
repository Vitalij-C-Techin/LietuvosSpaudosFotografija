package lt.techin.lsf.model.requests;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class UpdateUserRequestTest {

    @Test
    void testUpdateUserRequest() {
        UpdateUserRequest request = new UpdateUserRequest(
                "John",
                "Doe",
                1985,
                "+1234567890",
                "john.doe@example.com",
                "Sample Media"
        );

        assertEquals("John", request.getName());
        assertEquals("Doe", request.getSurname());
        assertEquals(1985, (int) request.getBirthYear());
        assertEquals("+1234567890", request.getPhoneNumber());
        assertEquals("john.doe@example.com", request.getEmail());
        assertEquals("Sample Media", request.getMediaName());
    }
}
