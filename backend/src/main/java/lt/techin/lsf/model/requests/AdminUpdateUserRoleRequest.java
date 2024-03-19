package lt.techin.lsf.model.requests;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lt.techin.lsf.model.User;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminUpdateUserRoleRequest {

    @NotNull
    private User.Role role;

}
