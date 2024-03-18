package lt.techin.lsf.model.mapper;

import lt.techin.lsf.model.response.UserDataForListResponse;
import lt.techin.lsf.persistance.model.UserRecord;

public class UserDataForListMapper {
    public static UserDataForListResponse userRecordToUserResponseForList(UserRecord userRecord) {

        return UserDataForListResponse.builder()
                .name(userRecord.getName())
                .surname(userRecord.getSurname())
                .email(userRecord.getEmail())
                .birthYear(userRecord.getBirthYear())
                .build();
    }
}
