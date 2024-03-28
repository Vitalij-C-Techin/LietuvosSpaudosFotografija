package lt.techin.lsf.model.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lt.techin.lsf.validator.ValidBooleanValueConstraint;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminUpdateUserIsActiveRequest {

    @ValidBooleanValueConstraint
    @JsonProperty("is_active")
    private Boolean isActive;
}
