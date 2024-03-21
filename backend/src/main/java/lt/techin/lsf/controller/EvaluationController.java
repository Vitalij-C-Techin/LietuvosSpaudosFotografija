package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.persistance.EvaluationRepository;
import lt.techin.lsf.persistance.model.EvaluationRecord;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class EvaluationController {
    private final EvaluationRepository evaluationRepository;
    @PostMapping("/evaluation")
    public void evaluate(@RequestBody EvaluationRecord evaluationRecord) {
         evaluationRepository.save(evaluationRecord.setupNewEvaluation());
    }

}
