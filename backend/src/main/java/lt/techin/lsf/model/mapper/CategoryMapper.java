package lt.techin.lsf.model.mapper;

import lt.techin.lsf.model.Category;
import lt.techin.lsf.persistance.model.CategoryRecord;

public class CategoryMapper {
    public static Category categoryRecordToCategory (CategoryRecord categoryRecord) {

        return Category.builder()
                .nameLt(categoryRecord.getNameLt())
                .nameEn(categoryRecord.getNameEn())
                .descriptionLt(categoryRecord.getDescriptionLt())
                .descriptionEn(categoryRecord.getDescriptionEn())
                .albumType(categoryRecord.getAlbumType())
                .photoLimit(categoryRecord.getPhotoLimit())
                .isPreset(categoryRecord.getIsPreset())
                .competitionUuid(categoryRecord.getCompetitionRecord().getUuid())
                .build();
    }
}
