package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.ParticipationRequest;
import lt.techin.lsf.model.requests.CreateParticipationRequest;
import lt.techin.lsf.model.requests.UpdateParticipationRequest;
import lt.techin.lsf.persistance.model.ParticipationRequestRecord;
import lt.techin.lsf.service.ParticipationRequestService;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/participation")
@CrossOrigin(origins = "http://localhost:5173")
public class ParticipationController {
    private final ParticipationRequestService requestService;

    @PostMapping
    public ParticipationRequest createRequest(
            @RequestBody CreateParticipationRequest request
    ) {
        return requestService.createRequest(request);
    }

    @DeleteMapping("/{uuid}")
    public void deleteRequest(
            @PathVariable UUID uuid
    ) {
        requestService.deleteRequest(uuid);
    }

    @PutMapping("/{uuid}")
    public ParticipationRequest updateRequest(
            @RequestBody UpdateParticipationRequest request
    ) {
        return requestService.updateRequest(request);
    }

    @GetMapping("/{uuid}")
    public ParticipationRequest getRequest(
            @PathVariable UUID uuid
    ) {
        return requestService.getRequest(uuid);
    }

    @GetMapping("/all/pending/{page}")
    public Page<ParticipationRequestRecord> getPendingRequests(
            @PathVariable int page
    ) {
        return requestService.getPendingRequest(page);
    }
}
