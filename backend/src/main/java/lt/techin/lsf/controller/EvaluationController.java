package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.persistance.EvaluationRepository;
import lt.techin.lsf.persistance.PhotoRepository;
import lt.techin.lsf.persistance.model.EvaluationRecord;
import lt.techin.lsf.persistance.model.PhotoRecord;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class EvaluationController {
    private final EvaluationRepository evaluationRepository;
    private final PhotoRepository photoRepository;

    @PostMapping("/evaluation")
    public void evaluate(@RequestBody EvaluationRecord evaluationRecord) {
         evaluationRepository.save(evaluationRecord.setupNewEvaluation());
    }

    @PostMapping("/add-photo")
    public void addPhoto(@RequestBody List<PhotoRecord> photoRecord) {
        photoRepository.saveAll(photoRecord);
    }

}
