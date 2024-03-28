package lt.techin.lsf.model.requests;

import lombok.*;
import lt.techin.lsf.validator.ValidEmailConstraint;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ForgetPasswordRequest {

    @ValidEmailConstraint
    private String email;

}