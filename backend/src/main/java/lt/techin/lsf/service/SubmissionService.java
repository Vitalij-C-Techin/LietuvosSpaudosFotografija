package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.persistance.SubmissionRepository;
import lt.techin.lsf.persistance.model.SubmissionRecord;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubmissionService {
    private final SubmissionRepository submissionRepository;

    public SubmissionRecord create(SubmissionRecord request){
        return submissionRepository.save(request);
    }

    public SubmissionRecord getUserSubmission(
            UUID userUuid,
            UUID categoryUuid
    ){
        return submissionRepository.findByParticipantUuidAndCategoryUuid(userUuid, categoryUuid);
    }
}
