package lt.techin.lsf.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lt.techin.lsf.persistance.model.ParticipationRequestRecord;

@Getter
@AllArgsConstructor
public class ParticipationRequest {
    private ParticipationRequestRecord data;

    public enum Status {
        PENDING,
        REJECT,
        PERMIT
    }
}
