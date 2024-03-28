package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.response.PhotoRecordResponse;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import lt.techin.lsf.service.CompetitionService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @GetMapping("/{comp_uuid}/category/{category_uuid}")
    public ResponseEntity<List<PhotoRecordResponse>> getAllSubmissions(@PathVariable UUID comp_uuid,
                                                                       @PathVariable UUID category_uuid) {
        return ResponseEntity
                .ok(competitionService.getAllPhotoRecordsForCompetitionAndCategory(comp_uuid, category_uuid));
    }
}
