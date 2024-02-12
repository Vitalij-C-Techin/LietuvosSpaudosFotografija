package lt.techin.lsf.model.mapper;

import lt.techin.lsf.model.User;
import lt.techin.lsf.model.response.UserResponse;
import lt.techin.lsf.persistance.model.UserRecord;

public class UserResponseMapper {
    public static UserResponse map(User user) {
        if (null == user) {
            return null;
        }

        return UserResponse.builder()
                .uuid(user.getUuid())
                .name(user.getName())
                .surname(user.getSurname())
                .birthYear(user.getBirthYear())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .mediaName(user.getMediaName())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
