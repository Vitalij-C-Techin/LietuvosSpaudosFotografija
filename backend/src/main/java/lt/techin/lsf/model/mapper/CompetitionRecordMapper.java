package lt.techin.lsf.model.mapper;

import lt.techin.lsf.model.requests.CompetitionRequest;
import lt.techin.lsf.persistance.model.CompetitionRecord;

public class CompetitionRecordMapper {
    public static CompetitionRecord map(CompetitionRequest competitionRequest){
        return CompetitionRecord.builder()
                .nameLt(competitionRequest.getNameLt())
                .nameEn(competitionRequest.getNameEn())
                .descriptionLt(competitionRequest.getDescriptionLt())
                .descriptionEn(competitionRequest.getDescriptionEn())
                .photoLimit(competitionRequest.getPhotoLimit())
                .startDate(competitionRequest.getStartDate())
                .endDate(competitionRequest.getEndDate())
                .status(competitionRequest.getStatus())
                .visibility(competitionRequest.getVisibility())
                .build();
    }
}
