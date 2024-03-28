package lt.techin.lsf.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.persistance.model.CompetitionRecord;

@Getter
@Setter
@Builder
public class CompetitionWithCategoriesResponse {
    private CompetitionRecord competition;
}
