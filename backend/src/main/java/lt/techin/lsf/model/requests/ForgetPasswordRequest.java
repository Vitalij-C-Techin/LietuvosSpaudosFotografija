package lt.techin.lsf.model.requests;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.exception.*;

import java.util.regex.Pattern;

@Getter
@Setter
@Builder
public class ForgetPasswordRequest {

    private String email;

    public void validateData() {

        if (null == email) {
            throw new ForgotPasswordException("Email not found");
        }

        if (email.length() < 5) {
            throw new ForgotPasswordException("Email is too short");
        }

        if (email.length() > 60) {
            throw new ForgotPasswordException("Email is too long");
        }

        if (!Pattern.matches("^[a-zA-Z0-9.]+[@][a-zA-Z0-9]+[.][a-zA-Z]+$", email)) {
            throw new ForgotPasswordException("Email invalid format");
        }
    }
}