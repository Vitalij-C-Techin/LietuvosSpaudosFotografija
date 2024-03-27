package lt.techin.lsf.service;

import lombok.*;
import lt.techin.lsf.model.requests.EvaluationRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import lt.techin.lsf.persistance.EvaluationRepository;
import lt.techin.lsf.persistance.PhotoRepository;
import lt.techin.lsf.persistance.model.EvaluationRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@Getter
@Setter
@Service
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final PhotoRepository photoRepository;
    public ResponseEntity<List<EvaluationRecord>> evaluate(EvaluationRequest evaluationRequest) {
        EvaluationRecord existingRecord = evaluationRepository.findByJuryIdAndPhotoRecord_Uuid(
                evaluationRequest.getJuryUuid(),
                evaluationRequest.getPhotoUuid()
        );

        if (existingRecord != null) {
            evaluationRepository.delete(existingRecord);
            List<EvaluationRecord> evaluations = evaluationRepository.findAll();
            return new ResponseEntity<>(evaluations, HttpStatus.OK);
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
            List<EvaluationRecord> evaluations = evaluationRepository.findAll();
            return new ResponseEntity<>(evaluations, HttpStatus.OK);
        } else {
            List<EvaluationRecord> evaluations = new ArrayList<>();
            return new ResponseEntity<>(evaluations, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}