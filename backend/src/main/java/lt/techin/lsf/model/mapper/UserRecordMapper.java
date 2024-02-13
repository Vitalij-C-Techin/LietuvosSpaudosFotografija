package lt.techin.lsf.model.mapper;

import lt.techin.lsf.model.User;
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
}
