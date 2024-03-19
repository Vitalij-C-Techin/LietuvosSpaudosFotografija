package lt.techin.lsf.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {
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

    private boolean isActive;
    private Timestamp createdAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                new SimpleGrantedAuthority(role.name())
        );
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public enum Role {
        USER,
        JURY,
        MODERATOR,
        ADMIN;

        @JsonCreator
        public static Role forValue(String value) {
            if (value == null || value.isEmpty()) {
                return null;
            }
            return Role.valueOf(value.toUpperCase());
        }

    }
}
