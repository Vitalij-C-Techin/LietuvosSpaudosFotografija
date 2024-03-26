package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import lt.techin.lsf.service.CompetitionService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/jury")
@CrossOrigin(origins = "http://localhost:5173")
public class JuryController {
    private final CompetitionService competitionService;

    @GetMapping("/{uuid}")
    public CompetitionRecord getCompetition(
            @PathVariable UUID uuid
    ) {
        return competitionService.getCompetition(uuid).getData();
    }

    @GetMapping("/all/{page}")
    public Page<CompetitionRecord> getJuryActiveCompetitionsWithPagination(
            @PathVariable int page
    ) {
        return competitionService.getJuryActiveCompetitionsWithPagination(page);
    }
}
