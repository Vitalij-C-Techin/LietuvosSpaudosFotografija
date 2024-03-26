package lt.techin.lsf.persistance;

import lt.techin.lsf.model.response.PhotoRecordResponse;
import lt.techin.lsf.persistance.model.SubmissionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<SubmissionRecord, UUID>
{
    @Query("SELECT new lt.techin.lsf.model.response.PhotoRecordResponse(p.uuid, p.nameLt, p.nameEn, p.descriptionLt, p.descriptionEn, p.position," +
            " a.submission.uuid) FROM AlbumRecord a JOIN a.photoList p WHERE a.submission.competitionUuid = :competitionUuid AND a.submission.categoryUuid = :categoryUuid")
    List<PhotoRecordResponse> findPhotoRecordsByCompetitionUuidAndCategoryUuid(@Param("competitionUuid") UUID competitionUuid, @Param("categoryUuid") UUID categoryUuid);
}
