package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.response.PhotoRecordResponse;
import lt.techin.lsf.persistance.SubmissionRepository;
import lt.techin.lsf.persistance.model.SubmissionRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/submission")
@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {
    private final SubmissionRepository submissionRepository;

    @PostMapping
    public ResponseEntity <SubmissionRecord> addSubmission(@RequestBody SubmissionRecord submissionRecord) {
        submissionRepository.save(submissionRecord);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<SubmissionRecord> getSubmission(@PathVariable UUID uuid) {
        return submissionRepository.findById(uuid)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    @GetMapping("/competition/{comp_uuid}/category/{category_uuid}")
//    public ResponseEntity<List<PhotoRecordResponse>> getAllSubmissions(@PathVariable UUID comp_uuid,
//                                                                       @PathVariable UUID category_uuid) {
//        List<PhotoRecordResponse> photoUuids = submissionRepository.findPhotoRecordsByCompetitionUuidAndCategoryUuid(comp_uuid, category_uuid);
//        return ResponseEntity.ok(photoUuids);
//    }

}
