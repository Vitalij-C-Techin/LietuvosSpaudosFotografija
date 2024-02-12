package lt.techin.lsf.persistance.model;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.model.User;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

import static jakarta.persistence.EnumType.STRING;

@Getter
@Setter
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

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    public UserRecord() {
        this.uuid = UUID.randomUUID();
        this.role = User.Role.USER;
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    @Builder
    public UserRecord(String name, String surname, int birthYear,
                      String phoneNumber, String email, String password,
                      String mediaName) {
        this();
        this.name = name;
        this.surname = surname;
        this.birthYear = birthYear;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.mediaName = mediaName;
    }

    @Builder
    public UserRecord(String name, String surname, String email, String password) {
        this();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

    public UserRecord setupNewUser() {
        generateUuid();
        createdNow();
        defaultRole();

        return this;
    }

    public UserRecord generateUuid() {
        this.uuid = UUID.randomUUID();

        return this;
    }

    public UserRecord createdNow() {
        this.createdAt = new Timestamp(System.currentTimeMillis());

        return this;
    }

    public UserRecord defaultRole() {
        this.role = User.Role.USER;

        return this;
    }
}
