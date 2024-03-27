package lt.techin.lsf.service;

import lombok.*;
import lt.techin.lsf.model.requests.EvaluationRequest;
import lt.techin.lsf.model.response.EvaluationResponse;
import org.jetbrains.annotations.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import lt.techin.lsf.persistance.EvaluationRepository;
import lt.techin.lsf.persistance.PhotoRepository;
import lt.techin.lsf.persistance.model.EvaluationRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@AllArgsConstructor
@Getter
@Setter
@Service
public class EvaluationService {

    private final EvaluationRepository evaluationRepository;
    private final PhotoRepository photoRepository;
public ResponseEntity<List<EvaluationResponse>> evaluate(EvaluationRequest evaluationRequest) {
    EvaluationRecord existingRecord = evaluationRepository.findByJuryIdAndPhotoRecord_Uuid(
            evaluationRequest.getJuryUuid(),
            evaluationRequest.getPhotoUuid()
    );

    if (existingRecord != null) {
        evaluationRepository.delete(existingRecord);
        return getListResponseEntity();
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
        return getListResponseEntity();
    } else {
        List<EvaluationResponse> response = new ArrayList<>();
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    @NotNull
    private ResponseEntity<List<EvaluationResponse>> getListResponseEntity() {
        List<EvaluationRecord> evaluations = evaluationRepository.findAll();
        List<EvaluationResponse> response = evaluations.stream()
                .map(evalRecord -> {
                    EvaluationResponse res = new EvaluationResponse();
                    res.setUuid(evalRecord.getUuid());
                    res.setJuryId(evalRecord.getJuryId());
                    return res;
                })
                .collect(Collectors.toList());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}