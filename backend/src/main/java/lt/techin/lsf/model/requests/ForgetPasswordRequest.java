package lt.techin.lsf.model.requests;

import lombok.NoArgsConstructor;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.exception.*;

import java.util.regex.Pattern;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ForgetPasswordRequest {

    private String email;

    public void validateData() {

        if (null == email) {
            throw new ForgotPasswordException("Email not found");
        }

        if (!Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$", Pattern.CASE_INSENSITIVE).matcher(email)
                .matches()) {
            throw new UserRegistrationEmailInvalidFormatException("Email invalid format");
        }
    }
}