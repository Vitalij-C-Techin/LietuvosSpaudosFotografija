package lt.techin.lsf.persistance;

import lt.techin.lsf.persistance.model.CategoryRecord;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryRecord, UUID> {

    boolean existsByCompetitionRecordAndNameLtAndNameEnAndDescriptionLtAndDescriptionEnIgnoreCase(
            CompetitionRecord competitionRecord,
            String nameLt,
            String nameEn,
            String descriptionLt,
            String descriptionEn);

}
