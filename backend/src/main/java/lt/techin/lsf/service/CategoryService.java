package lt.techin.lsf.service;

import jakarta.persistence.EntityNotFoundException;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.mapper.CategoryRecordMapper;
import lt.techin.lsf.model.requests.CategoryRequest;
import lt.techin.lsf.persistance.CategoryRepository;
import lt.techin.lsf.persistance.model.CategoryRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private static final String CATEGORY_NOT_FOUND_MESSAGE = "Category not found by uuid - ";

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(CategoryRequest categoryRequest) {
        CategoryRecord categoryRecord = CategoryRecordMapper.categoryRequestToRecord(categoryRequest);

        categoryRecord.setupNewCategory();

        return new Category(
                categoryRepository.save(categoryRecord)
        );
    }

    public Category getCategory(UUID uuid) {

        Category category = new Category(
                categoryRepository
                        .findById(uuid)
                        .orElseThrow(() -> new EntityNotFoundException(CATEGORY_NOT_FOUND_MESSAGE + uuid))
        );

        return category;
    }

    public Category updateCategory(UUID uuid, CategoryRequest categoryRequest) {
        CategoryRecord categoryRecord = categoryRepository
                .findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException(CATEGORY_NOT_FOUND_MESSAGE + uuid));

        categoryRecord.setNameLt(categoryRequest.getCategoryNameLt());
        categoryRecord.setNameEn(categoryRequest.getCategoryNameEn());
        categoryRecord.setDescriptionLt(categoryRequest.getCategoryDescriptionLt());
        categoryRecord.setDescriptionEn(categoryRequest.getCategoryDescriptionEn());
        categoryRecord.setPhotoLimit(categoryRequest.getPhotoLimit());
        categoryRecord.setAlbumType(categoryRequest.getAlbumType());
        categoryRecord.setPhotoFormat(categoryRequest.getPhotoFormatType());
        categoryRecord.setPhotoSize(categoryRequest.getPhotoSize());

        return new Category(
                categoryRepository.save(categoryRecord)
        );
    }

    public void deleteCategory(UUID uuid) {
        if (!categoryRepository.existsById(uuid)) {
            throw new EntityNotFoundException(CATEGORY_NOT_FOUND_MESSAGE + uuid);
        }

        categoryRepository.deleteById(uuid);
    }
}
