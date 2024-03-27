package lt.techin.lsf.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.persistance.model.AlbumRecord;
import lt.techin.lsf.persistance.model.SubmissionRecord;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserSubmissionResponse {
    private SubmissionRecord submission;
    private List<AlbumRecord> albums;
}
