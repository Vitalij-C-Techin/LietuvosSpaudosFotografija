package lt.techin.lsf.model.mapper;

import lt.techin.lsf.model.User;
import lt.techin.lsf.model.requests.AdminRegisterJuryRequest;
import lt.techin.lsf.model.requests.AdminRegisterUserRequest;
import lt.techin.lsf.model.requests.RegisterRequest;
import lt.techin.lsf.persistance.model.UserRecord;

public class UserRecordMapper {
    public static UserRecord map(User user) {
        if (null == user) {
            return null;
        }

        return UserRecord.builder()
                .build();
    }

    public static UserRecord map(RegisterRequest registerRequest) {
        if (null == registerRequest) {
            return null;
        }

        return UserRecord.builder()
                .name(registerRequest.getName())
                .surname(registerRequest.getSurname())
                .birthYear(registerRequest.getBirthYear())
                .phoneNumber(registerRequest.getPhoneNumber())
                .email(registerRequest.getEmail())
                .password(registerRequest.getPassword())
                .mediaName(registerRequest.getMediaName())
                .build();
    }

    public static UserRecord mapAdminRegistration(AdminRegisterUserRequest registerRequest) {
        if (null == registerRequest) {
            return null;
        }

        return UserRecord.builder()
                .name(registerRequest.getName().trim())
                .surname(registerRequest.getSurname().trim())
                .birthYear(registerRequest.getBirthYear())
                .phoneNumber(registerRequest.getPhoneNumber().trim())
                .email(registerRequest.getEmail().trim())
                .password(registerRequest.getPassword().trim())
                .mediaName(registerRequest.getMediaName() != null ? registerRequest.getMediaName().trim() : null)
                .role(registerRequest.getRole())
                .build();
    }

    public static UserRecord mapAdminRegistration(AdminRegisterJuryRequest registerRequest) {
        if (null == registerRequest) {
            return null;
        }

        return UserRecord.builder()
                .name(registerRequest.getName().trim())
                .surname(registerRequest.getSurname().trim())
                .email(registerRequest.getEmail().trim())
                .password(registerRequest.getPassword().trim())
                .build();
    }
}
