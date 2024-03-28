package lt.techin.lsf.model.mapper;

import lt.techin.lsf.model.User;
import lt.techin.lsf.persistance.model.UserRecord;

import java.util.List;

public class UserMapper {
    public static User map(UserRecord userRecord) {
        if (null == userRecord) {
            return null;
        }

        return User.builder()
                .uuid(userRecord.getUuid())
                .name(userRecord.getName())
                .surname(userRecord.getSurname())
                .email(userRecord.getEmail())
                .phoneNumber(userRecord.getPhoneNumber())
                .birthYear(userRecord.getBirthYear())
                .mediaName(userRecord.getMediaName())
                .role(userRecord.getRole())
                .password(userRecord.getPassword())
                .passwordResetToken(userRecord.getPasswordResetToken())
                .passwordResetRequestAt(userRecord.getPasswordResetRequestAt())
                .createdAt(userRecord.getCreatedAt())
                .isActive(userRecord.isActive())
                .build();
    }

    public static List<User> map(List<UserRecord> userRecords) {
        if (null == userRecords) {
            return null;
        }

        return userRecords.stream()
                .map(UserMapper::map)
                .toList();
    }
}
