package lt.techin.lsf.model.response;

import lombok.*;
import lt.techin.lsf.persistance.model.CategoryRecord;

@Getter
@Setter
@Builder
public class CategoryResponse {
    private CategoryRecord categoryRecord;
}
