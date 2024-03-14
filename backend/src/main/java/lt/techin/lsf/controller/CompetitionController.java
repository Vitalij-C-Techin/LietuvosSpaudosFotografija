package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.Competition;
import lt.techin.lsf.model.requests.CreateCompetitionRequest;
import lt.techin.lsf.model.requests.UpdateCompetitionRequest;
import lt.techin.lsf.model.response.CompetitionWithCategoriesResponse;
import lt.techin.lsf.model.response.CreateCompetitionResponse;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import lt.techin.lsf.service.CompetitionService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/competition")
@CrossOrigin(origins = "http://localhost:5173")
public class CompetitionController {
    private final CompetitionService competitionService;

    @PostMapping
    public CreateCompetitionResponse createCompetition(
            @RequestBody CreateCompetitionRequest competition
    ) {
        return competitionService.createCompetition(competition);
    }

    @DeleteMapping("/{uuid}")
    public void deleteCompetition(
            @PathVariable UUID uuid
    ) {
        competitionService.deleteCompetition(uuid);
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

    @GetMapping("/{uuid}/categories")
    public List<Category> getCompetitionCategories(
            @PathVariable UUID uuid
    ) {
        CompetitionRecord competitionRecord = competitionService.getCompetitionByUuid(uuid);
        return competitionService.getCompetitionWithCategories(competitionRecord);
    }

    @GetMapping("/all/{page}")
    public Page<CompetitionRecord> getAdminAllCompetitionsWithPagination(
            @PathVariable int page
    ) {
        return competitionService.getAllCompetitionsWithPagination(page);
    }

    @GetMapping("/all/active/{page}")
    public Page<CompetitionRecord> getActiveCompetitionsWithPagination(
            @PathVariable int page
    ) {
        return competitionService.getActiveCompetitionsWithPagination(page);
    }

    @GetMapping("/user/{page}")
    public Page<CompetitionRecord> getUserActiveCompetitionsWithPagination(
            @PathVariable int page
    ) {
        return competitionService.getUserCompetitionsWithPagination(page);
    }

    @GetMapping("/user/participate/{page}")
    public Page<CompetitionWithCategoriesResponse> getUserParticipateCompetitionsWithPagination(
            @PathVariable int page
    ) {
        return competitionService.getUserNotParticipatedCompetitionsWithPagination(page);
    }

    @GetMapping("/jury/{page}")
    public Page<CompetitionRecord> getJuryActiveCompetitionsWithPagination(
            @PathVariable int page
    ) {
        return competitionService.getJuryActiveCompetitionsWithPagination(page);
    }
}
