package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.Competition;
import lt.techin.lsf.model.requests.CreateCompetitionRequest;
import lt.techin.lsf.model.requests.UpdateCompetitionRequest;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import lt.techin.lsf.service.CompetitionService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/competition")
@CrossOrigin(origins = "http://localhost:5173")
public class CompetitionController {
    private final CompetitionService competitionService;

    @PostMapping
    public Competition createCompetition(
            @RequestBody CreateCompetitionRequest competition
    ) {
        return competitionService.createCompetition(competition);
    }

    @GetMapping("/{uuid}")
    public Competition getCompetition(
            @PathVariable UUID uuid
    ) {
        return competitionService.getCompetition(uuid);
    }

    @PutMapping("/{uuid}")
    public Competition updateCompetition(
            @PathVariable UUID uuid,
            @RequestBody UpdateCompetitionRequest data
    ) {
        return competitionService.updateCompetition(uuid, data);
    }

    @GetMapping("/all/{page}")
    public Page<CompetitionRecord> getAdminAllCompetitionsWithPagination(
            @PathVariable int page
    ) {
        return competitionService.getAllCompetitionsWithPagination(page);
    }

    @GetMapping("/user/{page}")
    public void getUserActiveCompetitionsWithPagination(
            @PathVariable int page
    ) {
        //TODO
    }

    @GetMapping("/user/participate")
    public void getUserParticipateCompetitionsWithPagination(
            @PathVariable int page
    ) {
        //TODO
    }
}
