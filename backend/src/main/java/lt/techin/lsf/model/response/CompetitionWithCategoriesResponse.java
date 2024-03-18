package lt.techin.lsf.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.persistance.model.CategoryRecord;
import lt.techin.lsf.persistance.model.CompetitionRecord;

import java.util.List;

@Getter
@Setter
@Builder
public class CompetitionWithCategoriesResponse {
    public CompetitionRecord competition;
    public List<CategoryRecord> categories;
}
