package lt.techin.lsf.service;

import lt.techin.lsf.model.mapper.CategoryMapper;
import lt.techin.lsf.model.requests.CategoryRequest;
import lt.techin.lsf.model.response.CategoryResponse;
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

    public CategoryResponse createCategory(CategoryRequest categoryRequest) {

        CategoryRecord categoryRecord = CategoryMapper.categoryRequestToRecord(categoryRequest);
        categoryRecord.setupNewCategory();

        categoryRepository.save(categoryRecord);

        return CategoryResponse.builder()
                .categoryRecord(categoryRecord)
                .build();
    }
}
