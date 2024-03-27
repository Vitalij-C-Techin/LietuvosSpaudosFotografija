package lt.techin.lsf.service;

import lombok.*;
import lt.techin.lsf.model.requests.EvaluationRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import lt.techin.lsf.persistance.EvaluationRepository;
import lt.techin.lsf.persistance.PhotoRepository;
import lt.techin.lsf.persistance.model.EvaluationRecord;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@Getter
@Setter
@Service
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final PhotoRepository photoRepository;
    public ResponseEntity<String> evaluate(EvaluationRequest evaluationRequest) {
        EvaluationRecord existingRecord = evaluationRepository.findByJuryIdAndPhotoRecord_Uuid(
                evaluationRequest.getJuryUuid(),
                evaluationRequest.getPhotoUuid()
        );

        if (existingRecord != null) {
            evaluationRepository.delete(existingRecord);
            return new ResponseEntity<>("Photo removed successfully", HttpStatus.OK);
        }

        EvaluationRecord record = EvaluationRecord.builder()
                .juryId(evaluationRequest.getJuryUuid())
                .submissionId(evaluationRequest.getSubmissionUuid())
                .photoRecord(photoRepository.findByUuid(evaluationRequest.getPhotoUuid()))
                .albumId(evaluationRequest.getAlbumUuid())
                .liked(evaluationRequest.isLiked())
                .build()
                .setupNewEvaluation();

        evaluationRepository.save(record);

        if (record.getPhotoRecord() != null) {
            return new ResponseEntity<>("Photo saved successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error saving photo", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}