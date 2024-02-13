package lt.techin.lsf.model.requests;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    private String email;
    private String password;
}