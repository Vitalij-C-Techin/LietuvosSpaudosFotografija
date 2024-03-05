package lt.techin.lsf.model.mapper;

import lt.techin.lsf.model.requests.CreateCategoryRequest;
import lt.techin.lsf.persistance.model.CategoryRecord;

public class CategoryRecordMapper {

    public static CategoryRecord categoryRequestToRecord (CreateCategoryRequest categoryRequest) {

        return CategoryRecord.builder()
                .nameLt(categoryRequest.getCategoryNameLt())
                .nameEn(categoryRequest.getCategoryNameEn())
                .descriptionLt(categoryRequest.getCategoryDescriptionLt())
                .descriptionEn(categoryRequest.getCategoryDescriptionEn())
                .albumType(categoryRequest.getAlbumType())
                .photoLimit(categoryRequest.getPhotoLimit())
                .photoFormat(categoryRequest.getPhotoFormatType())
                .photoSize(categoryRequest.getPhotoSize())
                .build();
    }
}
