package lt.techin.lsf.service;

import jakarta.persistence.EntityNotFoundException;
import lt.techin.lsf.exception.CategoryExistsException;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.mapper.CategoryMapper;
import lt.techin.lsf.model.mapper.CategoryRecordMapper;
import lt.techin.lsf.model.requests.CategoryRequest;
import lt.techin.lsf.persistance.CategoryRepository;
import lt.techin.lsf.persistance.CompetitionRepository;
import lt.techin.lsf.persistance.model.CategoryRecord;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CompetitionRepository competitionRepository;
    private static final String CATEGORY_NOT_FOUND_MESSAGE = "Category not found.";
    private static final String COMPETITION_NOT_FOUND_MESSAGE = "Competition not found.";

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, CompetitionRepository competitionRepository) {
        this.categoryRepository = categoryRepository;
        this.competitionRepository = competitionRepository;
    }

    public Category createCategoryAndAddToCompetition(CompetitionRecord competitionRecord, CategoryRequest categoryRequest) {
        if (hasCategoryInCompetition(competitionRecord, categoryRequest)) {
            throw new CategoryExistsException("Category exists in this competition");
        }

        CategoryRecord categoryRecord = createCategoryRecord(categoryRequest, competitionRecord);
        CategoryRecord savedCategoryRecord = categoryRepository.save(categoryRecord);

        return CategoryMapper.categoryRecordToCategory(savedCategoryRecord);
    }

    public Category getCategory(UUID uuid) {
        CategoryRecord categoryRecord = getCategoryByUuid(uuid);
        Category category = CategoryMapper.categoryRecordToCategory(categoryRecord);

        return category;
    }

    public Category updateCategory(UUID categoryUuid, CategoryRequest categoryRequest) {
        CategoryRecord categoryRecordToUpdate = getCategoryByUuid(categoryUuid);
        CategoryRecord updatedCategoryRecord = updateCategoryRecord(categoryRequest, categoryRecordToUpdate);
        CategoryRecord savedCategory = categoryRepository.save(updatedCategoryRecord);

        return CategoryMapper.categoryRecordToCategory(savedCategory);
    }

    public void deleteCategoryAndUpdateCompetition(UUID categoryUuid) {
        CategoryRecord categoryRecordToDelete = getCategoryByUuid(categoryUuid);
        CompetitionRecord competitionRecordToUpdate = categoryRecordToDelete.getCompetitionRecord();
        competitionRecordToUpdate.getCategoryRecordList().remove(categoryRecordToDelete);
        categoryRepository.deleteById(categoryUuid);
    }

    public CompetitionRecord getCompetitionByUuid(UUID competitionUuid) {

        return competitionRepository
                .findById(competitionUuid)
                .orElseThrow(() -> new EntityNotFoundException(COMPETITION_NOT_FOUND_MESSAGE));
    }

    private CategoryRecord getCategoryByUuid(UUID categoryUuid) {

        return categoryRepository
                .findById(categoryUuid)
                .orElseThrow(() -> new EntityNotFoundException(CATEGORY_NOT_FOUND_MESSAGE));
    }

    private CategoryRecord createCategoryRecord(CategoryRequest categoryRequest,
                                                CompetitionRecord competitionRecord) {
        CategoryRecord categoryRecord = CategoryRecordMapper.categoryRequestToRecord(categoryRequest);
        categoryRecord.setupNewCategory();
        competitionRecord.addCategory(categoryRecord);

        return categoryRecord;
    }

    private CategoryRecord updateCategoryRecord(CategoryRequest categoryRequest,
                                                CategoryRecord categoryRecord) {
        categoryRecord.setNameLt(categoryRequest.getCategoryNameLt());
        categoryRecord.setNameEn(categoryRequest.getCategoryNameEn());
        categoryRecord.setDescriptionLt(categoryRequest.getCategoryDescriptionLt());
        categoryRecord.setDescriptionEn(categoryRequest.getCategoryDescriptionEn());
        categoryRecord.setPhotoLimit(categoryRequest.getPhotoLimit());
        categoryRecord.setAlbumType(categoryRequest.getAlbumType());

        return categoryRecord;
    }

    public boolean hasCategoryInCompetition(CompetitionRecord competitionRecord, CategoryRequest categoryRequest) {
        return categoryRepository.existsByCompetitionRecordAndNameLtAndNameEnAndDescriptionLtAndDescriptionEnIgnoreCase(
                competitionRecord,
                categoryRequest.getCategoryNameLt(),
                categoryRequest.getCategoryNameEn(),
                categoryRequest.getCategoryDescriptionLt(),
                categoryRequest.getCategoryDescriptionEn()
        );
    }
}
