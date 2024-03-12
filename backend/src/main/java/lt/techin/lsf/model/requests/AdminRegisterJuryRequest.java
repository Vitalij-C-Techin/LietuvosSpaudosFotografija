package lt.techin.lsf.model.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lt.techin.lsf.validator.ValidEmailConstraint;
import lt.techin.lsf.validator.ValidNameConstraint;
import lt.techin.lsf.validator.ValidPasswordConstraint;
import lt.techin.lsf.validator.ValidSurnameConstraint;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminRegisterJuryRequest {

    @ValidNameConstraint
    private String name;

    @ValidSurnameConstraint
    private String surname;

    @ValidEmailConstraint
    private String email;

    @ValidPasswordConstraint
    private String password;

}
