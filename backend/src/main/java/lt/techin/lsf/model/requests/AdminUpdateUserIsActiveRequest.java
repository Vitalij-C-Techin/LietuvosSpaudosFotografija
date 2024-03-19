package lt.techin.lsf.model.requests;

import jakarta.validation.constraints.AssertTrue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminUpdateUserIsActiveRequest {

    @AssertTrue(message = "field must hold value true or false")
    private boolean isActive;
}
