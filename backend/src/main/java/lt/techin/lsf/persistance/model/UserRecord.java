package lt.techin.lsf.persistance.model;

import jakarta.persistence.*;
import lombok.*;
import lt.techin.lsf.model.User;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

import static jakarta.persistence.EnumType.STRING;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "`user`")
public class UserRecord {
    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "birth_year")
    private int birthYear;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "password_reset_token")
    private String passwordResetToken;

    @Column(name = "password_reset_request_at")
    private LocalDateTime passwordResetRequestAt;

    @Column(name = "media_name")
    private String mediaName;

    @Column(name = "role", nullable = false)
    @Enumerated(STRING)
    private User.Role role;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @PrePersist
    public void prePersist() {
        setDefaultActive();
    }

    private UserRecord setDefaultActive() {
        isActive = true;

        return this;
    }

    public UserRecord setupNewUser() {
        setGeneratedUuid();
        setCreatedAtNow();

        return this;
    }

    public UserRecord setGeneratedUuid() {
        uuid = UUID.randomUUID();

        return this;
    }

    public UserRecord setCreatedAtNow() {
        createdAt = new Timestamp(System.currentTimeMillis());

        return this;
    }

    public UserRecord setDefaultRole() {
        role = User.Role.USER;

        return this;
    }
}