package lt.techin.lsf.service;

import jakarta.persistence.EntityNotFoundException;
import lt.techin.lsf.model.Category;
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

    public Category createCategoryAndAddToCompetition(UUID competitionUuid, CategoryRequest categoryRequest) {
        CompetitionRecord competitionRecord = getCompetitionByUuid(competitionUuid);
        CategoryRecord categoryRecord = createCategoryRecord(categoryRequest, competitionRecord);

        return new Category(
                categoryRepository.save(categoryRecord)
        );
    }

    public Category getCategory(UUID uuid) {
        Category category = new Category(getCategoryByUuid(uuid));

        return category;
    }

    public Category updateCategory(UUID categoryUuid, CategoryRequest categoryRequest) {
        CategoryRecord categoryRecordToUpdate = getCategoryByUuid(categoryUuid);
        CategoryRecord updatedCategoryRecord = updateCategoryRecord(categoryRequest, categoryRecordToUpdate);

        return new Category(
                categoryRepository.save(updatedCategoryRecord)
        );
    }

    public void deleteCategoryAndUpdateCompetition(UUID categoryUuid) {
        CategoryRecord categoryRecordToDelete = getCategoryByUuid(categoryUuid);
        CompetitionRecord competitionRecordToUpdate = categoryRecordToDelete.getCompetitionRecord();
        competitionRecordToUpdate.getCategoryRecordList().remove(categoryRecordToDelete);
        categoryRepository.deleteById(categoryUuid);
    }

    private CompetitionRecord getCompetitionByUuid(UUID competitionUuid) {

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
        categoryRecord.setCompetitionRecord(competitionRecord);
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
        categoryRecord.setPhotoFormat(categoryRequest.getPhotoFormatType());
        categoryRecord.setPhotoSize(categoryRequest.getPhotoSize());

        return categoryRecord;
    }
}
