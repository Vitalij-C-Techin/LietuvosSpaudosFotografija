package lt.techin.lsf.model.response;

import lombok.*;
import lt.techin.lsf.model.Competition;
import lt.techin.lsf.persistance.model.ParticipationRequestRecord;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ParticipationRequestResponse {
    public ParticipationRequestRecord request;
    public UserResponse user;
    public Competition competition;
}
