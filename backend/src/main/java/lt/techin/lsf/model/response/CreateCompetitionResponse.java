package lt.techin.lsf.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.persistance.model.CompetitionRecord;

import java.util.List;

@Getter
@Setter
@Builder
public class CreateCompetitionResponse {
    private CompetitionRecord competition;
    private List<Category> categories;
}