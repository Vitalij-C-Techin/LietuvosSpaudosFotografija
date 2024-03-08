package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.ParticipationRequest;
import lt.techin.lsf.model.requests.CreateParticipationRequest;
import lt.techin.lsf.model.requests.UpdateParticipationRequest;
import lt.techin.lsf.persistance.ParticipationRequestRepository;
import lt.techin.lsf.persistance.model.ParticipationRequestRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ParticipationRequestService {
    private final AuthenticationService authenticationService;
    private final ParticipationRequestRepository requestRepository;

    public ParticipationRequest createRequest(CreateParticipationRequest request) {
        if (requestRepository.existsByUserUuidAndCompetitionUuid(
                request.getUserUuid(),
                request.getCompetitionUuid()
        )) {
            return null;
        }

        ParticipationRequestRecord record = ParticipationRequestRecord.builder()
                .userUuid(request.getUserUuid())
                .competitionUuid(request.getCompetitionUuid())
                .build();

        record.setupNewRequest();

        return new ParticipationRequest(
                requestRepository.save(record)
        );
    }

    public boolean deleteRequest(UUID uuid) {
        if (!requestRepository.existsByUuid(uuid)) {
            return false;
        }

        requestRepository.deleteByUuid(uuid);

        return true;
    }

    public ParticipationRequest updateRequest(
            UpdateParticipationRequest request) {
        if (!requestRepository.existsByUserUuidAndCompetitionUuid(
                request.getUserUuid(),
                request.getCompetitionUuid()
        )) {
            return null;
        }

        ParticipationRequestRecord record = requestRepository.findByUserUuidAndCompetitionUuid(
                request.getUserUuid(),
                request.getCompetitionUuid()
        );

        record.setStatus(record.getStatus());
        record.setApprovedBy(authenticationService.getAuthenticatedUser().getUuid());
        record.setApprovedAtNow();

        return new ParticipationRequest(
                requestRepository.save(record)
        );
    }

    public ParticipationRequest getRequest(UUID uuid) {
        return new ParticipationRequest(
                requestRepository.findByUuid(uuid)
        );
    }

    public ParticipationRequest getRequestByUserAndCompetition(UUID userUuid, UUID competitionUuid) {
        return new ParticipationRequest(
                requestRepository.findByUserUuidAndCompetitionUuid(userUuid, competitionUuid)
        );
    }

    public Page<ParticipationRequestRecord> getPendingRequest(int page){
        return requestRepository.findByStatus(
                ParticipationRequest.Status.PENDING,
                PageRequest.of(page, 20)
        );
    }
}