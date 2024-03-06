package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.Competition;
import lt.techin.lsf.model.mapper.CompetitionRecordMapper;
import lt.techin.lsf.model.requests.CreateCompetitionRequest;
import lt.techin.lsf.model.requests.UpdateCompetitionRequest;
import lt.techin.lsf.persistance.CompetitionRepository;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompetitionService {
    private static final int recordsPerPage = 5;

    private final CompetitionRepository competitionRepository;
    private final AuthenticationService authenticationService;

    public Competition createCompetition(CreateCompetitionRequest competitionData) {
        CompetitionRecord record = CompetitionRecordMapper.map(competitionData);

        record.setupNewCompetition();

        return new Competition(
                competitionRepository.save(record)
        );
    }

    public boolean deleteCompetition(UUID uuid) {
        if (!competitionRepository.existsByUuid(uuid)) {
            return false;
        }

        competitionRepository.deleteByUuid(uuid);

        return true;
    }

    public Competition updateCompetition(UUID uuid, UpdateCompetitionRequest competitionData) {
        CompetitionRecord record = competitionRepository.findByUuid(uuid);

        record.setNameLt(competitionData.getNameLt());
        record.setNameEn(competitionData.getNameEn());
        record.setDescriptionLt(competitionData.getDescriptionLt());
        record.setDescriptionEn(competitionData.getDescriptionEn());
        record.setPhotoLimit(competitionData.getPhotoLimit());
        record.setStartDate(competitionData.getStartDate());
        record.setEndDate(competitionData.getEndDate());
        record.setStatus(competitionData.getStatus());
        record.setVisibility(competitionData.getVisibility());

        return new Competition(
                competitionRepository.save(record)
        );
    }

    public Competition getCompetition(UUID uuid) {
        return new Competition(
                competitionRepository.findByUuid(uuid)
        );
    }

    public Page<CompetitionRecord> getAllCompetitionsWithPagination(int page) {
        return competitionRepository.findAll(
                PageRequest.of(page, recordsPerPage)
        );
    }

    public Page<CompetitionRecord> getUserCompetitionsWithPagination(int page) {
        return competitionRepository.findUserActiveCompetitions(
                authenticationService.getAuthenticatedUser().getUuid(),
                PageRequest.of(page, recordsPerPage)
        );
    }

    public Page<CompetitionRecord> getUserNotParticipatedCompetitionsWithPagination(int page) {
        return competitionRepository.findUserParticipateCompetitions(
                authenticationService.getAuthenticatedUser().getUuid(),
                PageRequest.of(page, recordsPerPage)
        );
    }

    public Page<CompetitionRecord> getJuryActiveCompetitionsWithPagination(int page){
        return competitionRepository.findJuryActiveCompetitions(PageRequest.of(page, recordsPerPage));
    }
}
