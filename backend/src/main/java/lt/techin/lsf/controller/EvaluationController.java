package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.requests.EvaluationRequest;
import lt.techin.lsf.persistance.EvaluationRepository;
import lt.techin.lsf.persistance.PhotoRepository;
import lt.techin.lsf.persistance.model.EvaluationRecord;
import lt.techin.lsf.persistance.model.PhotoRecord;
import lt.techin.lsf.service.EvaluationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:5173")
public class EvaluationController {
    private final EvaluationService evaluationService;


    @PostMapping("/evaluation")
    public void evaluate(@RequestBody EvaluationRequest evaluationRequest) {
        System.out.println(evaluationRequest.getJuryUuid());
        System.out.println("Evaluation received");
         evaluationService.evaluate(evaluationRequest);
        System.out.println("Evaluation saved");
    }


}
