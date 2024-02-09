package lt.techin.lsf.persistance.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "`user`")
public class User {

    @Id
    @Column(name = "uuid", nullable = false)
    private UUID uuid;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "birth_year")
    private int birthYear;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "password_reset_token")
    private String passwordResetToken;

    @Column(name = "password_reset_request_at")
    private LocalDateTime passwordResetRequestAt;

    @Column(name = "media_name")
    private String mediaName;

    @Column(name = "role")
    private String role;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    public User() {
        this.uuid = UUID.randomUUID();
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    @Builder
    public User(String name, String surname, int birthYear,
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
    public User(String name, String surname, String email, String password) {
        this();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }
}
