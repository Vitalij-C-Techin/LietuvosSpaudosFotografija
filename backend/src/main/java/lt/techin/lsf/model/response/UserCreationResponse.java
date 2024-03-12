package lt.techin.lsf.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.techin.lsf.persistance.model.UserRecord;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserCreationResponse {
    private String message;
    private UserRecord userRecord;
}
