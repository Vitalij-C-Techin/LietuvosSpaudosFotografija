package lt.techin.lsf.service;

import lombok.*;
import lt.techin.lsf.model.requests.EvaluationRequest;
import lt.techin.lsf.persistance.AlbumRepository;
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
    public void evaluate(EvaluationRequest evaluationRequest) {
        EvaluationRecord record = EvaluationRecord.builder()
                .juryId(evaluationRequest.getJuryUuid())
                .submissionId(evaluationRequest.getSubmissionUuid())
                .photoRecord(photoRepository.findByUuid(evaluationRequest.getPhotoUuid()))
                .albumId(evaluationRequest.getAlbumUuid())
                .liked(evaluationRequest.isLiked())
                .build()
                .setupNewEvaluation();

        evaluationRepository.save(record);
    }
}