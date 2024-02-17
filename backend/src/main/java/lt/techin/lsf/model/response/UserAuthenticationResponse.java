package lt.techin.lsf.model.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAuthenticationResponse {
    private String token;
    private UserResponse user;
}
