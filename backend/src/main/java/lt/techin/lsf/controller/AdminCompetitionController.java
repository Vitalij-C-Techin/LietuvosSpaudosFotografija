package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.Competition;
import lt.techin.lsf.model.requests.CompetitionRequest;
import lt.techin.lsf.service.CompetitionService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/admin/competition")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminCompetitionController {
    private final CompetitionService competitionService;

    @PostMapping
    public Competition createCompetition(
            @RequestBody CompetitionRequest competition
    ){
        return competitionService.createCompetition(competition);
    }

    @DeleteMapping("/{uuid}")
    public void deleteCompetition(
            @PathVariable String uuid
    ) {
        competitionService.deleteCompetition(
                UUID.fromString(uuid)
        );
    }

    @PutMapping("/{uuid}")
    public Competition updateCompetition(
            @PathVariable String uuid,
            @RequestBody CompetitionRequest data
    ){
        return competitionService.updateCompetition(
                UUID.fromString(uuid),
                data
        );
    }

    @GetMapping("/{uuid}")
    public Competition getCompetitionByUuid(
            @PathVariable String uuid
    ){
        return competitionService.getCompetition(
                UUID.fromString(uuid)
        );
    }
}
