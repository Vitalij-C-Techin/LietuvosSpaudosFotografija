package lt.techin.lsf.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;


@Getter
@AllArgsConstructor
@Builder
public class User {
    private UUID uuid;

    private String name;
    private String surname;

    private String email;
    private String phoneNumber;

    private int birthYear;
    private String mediaName;
    private Role role;

    private String password;
    private String passwordResetToken;
    private LocalDateTime passwordResetRequestAt;

    private Timestamp createdAt;

    public enum Role {
        USER,
        MODERATOR,
        ADMIN;
    }
}
