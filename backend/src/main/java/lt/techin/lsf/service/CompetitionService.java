package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.Competition;
import lt.techin.lsf.model.mapper.CompetitionRecordMapper;
import lt.techin.lsf.model.requests.CompetitionRequest;
import lt.techin.lsf.persistance.CompetitionRepository;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompetitionService {
    private final CompetitionRepository competitionRepository;

    public Competition createCompetition(CompetitionRequest competitionData){
        CompetitionRecord record = CompetitionRecordMapper.map(competitionData);

        record.setupNewCompetition();

        return new Competition(
                competitionRepository.save(record)
        );
    }

    public boolean deleteCompetition(UUID uuid){
        if(!competitionRepository.existsByUuid(uuid)){
            return false;
        }

        competitionRepository.deleteByUuid(uuid);

        return true;
    }

    public Competition updateCompetition(UUID uuid, CompetitionRequest competitionData){
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

    public Competition getCompetition(UUID uuid){
        return new Competition(
                competitionRepository.findByUuid(uuid)
        );
    }
}
