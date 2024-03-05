package lt.techin.lsf.service;

import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.mapper.CategoryRecordMapper;
import lt.techin.lsf.model.requests.CreateCategoryRequest;
import lt.techin.lsf.persistance.CategoryRepository;
import lt.techin.lsf.persistance.model.CategoryRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(CreateCategoryRequest categoryRequest) {
        CategoryRecord categoryRecord = CategoryRecordMapper.categoryRequestToRecord(categoryRequest);

        categoryRecord.setupNewCategory();

        return new Category(
                categoryRepository.save(categoryRecord)
        );
    }
}
