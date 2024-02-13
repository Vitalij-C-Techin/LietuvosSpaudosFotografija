package lt.techin.lsf.model;

import lombok.*;
import lt.techin.lsf.model.mapper.UserResponseMapper;
import lt.techin.lsf.model.response.UserAuthenticationResponse;
import lt.techin.lsf.model.response.UserResponse;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAuthentication {
    private String token;
    private User user;

    public UserAuthenticationResponse getUserAuthenticationResponse() {
        UserResponse userResponse = UserResponseMapper.map(user);

        return UserAuthenticationResponse.builder()
                .token(token)
                .user(userResponse)
                .build();
    }
}
