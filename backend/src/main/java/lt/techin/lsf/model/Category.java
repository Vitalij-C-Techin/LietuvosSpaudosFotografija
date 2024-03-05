package lt.techin.lsf.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lt.techin.lsf.persistance.model.CategoryRecord;

@Getter
@AllArgsConstructor
public class Category {
    private CategoryRecord categoryRecord;
}
