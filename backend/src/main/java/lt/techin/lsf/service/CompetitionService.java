package lt.techin.lsf.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lt.techin.lsf.exception.CompetitionExistsException;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.Competition;
import lt.techin.lsf.model.mapper.CategoryMapper;
import lt.techin.lsf.model.mapper.CompetitionRecordMapper;
import lt.techin.lsf.model.requests.CreateCompetitionRequest;
import lt.techin.lsf.model.requests.UpdateCompetitionRequest;
import lt.techin.lsf.model.response.CompetitionWithCategoriesResponse;
import lt.techin.lsf.model.response.CreateCompetitionResponse;
import lt.techin.lsf.persistance.CompetitionRepository;
import lt.techin.lsf.persistance.model.CategoryRecord;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CompetitionService {
    public static final int recordsPerPage = 10;

    private final CompetitionRepository competitionRepository;

    private final AuthenticationService authenticationService;
    private final CategoryService categoryService;

    public CreateCompetitionResponse createCompetition(CreateCompetitionRequest competitionData) {
        if (hasCompetition(competitionData)) {
            throw new CompetitionExistsException("Competition exists");
        }

        CompetitionRecord record = CompetitionRecordMapper.map(competitionData);

        record.setupNewCompetition();

        competitionRepository.save(record);

        if (null != competitionData.categories) {
            if (!competitionData.categories.isEmpty()) {

                competitionData.categories
                        .forEach(categoryRequest -> categoryService.createCategoryAndAddToCompetition(
                                record,
                                categoryRequest
                        ));
            }
        }

        return CreateCompetitionResponse.builder()
                .competition(record)
                .build();
    }

    public boolean hasCompetition(CreateCompetitionRequest competitionRequest) {
        return competitionRepository.existsByNameLtAndNameEnAndDescriptionLtAndDescriptionEn(
                competitionRequest.getNameLt(),
                competitionRequest.getNameEn(),
                competitionRequest.getDescriptionLt(),
                competitionRequest.getDescriptionEn()
        );
    }

    public boolean deleteCompetition(UUID uuid) {
        if (!competitionRepository.existsByUuid(uuid)) {
            return false;
        }

        competitionRepository.deleteByUuid(uuid);

        return true;
    }

    public Competition updateCompetition(UUID uuid, UpdateCompetitionRequest competitionData) {
        CompetitionRecord record = competitionRepository.findByUuid(uuid);

        record.setNameLt(competitionData.getNameLt());
        record.setNameEn(competitionData.getNameEn());
        record.setDescriptionLt(competitionData.getDescriptionLt());
        record.setDescriptionEn(competitionData.getDescriptionEn());
        record.setPhotoLimit(competitionData.getPhotoLimit());
        record.setStartDate(competitionData.getStartDate());
        record.setEndDate(competitionData.getEndDate());
        record.setStatus(competitionData.getStatus());
        record.setVisibility(competitionData.getVisibility());

        return new Competition(
                competitionRepository.save(record)
        );
    }

    public Competition getCompetition(UUID uuid) {
        return new Competition(
                competitionRepository.findByUuid(uuid)
        );
    }

    public List<Category> getCompetitionWithCategories(CompetitionRecord competitionRecord) {
        List<Category> categoryList = competitionRecord.getCategoryRecordList()
                .stream()
                .map(CategoryMapper::categoryRecordToCategory)
                .toList();

        return categoryList;
    }

    public List<CategoryRecord> getCompetitionWithCategoriesRecord(CompetitionRecord competitionRecord) {
        return competitionRecord.getCategoryRecordList();
    }

    public Page<CompetitionRecord> getAllCompetitionsWithPagination(int page) {
        return competitionRepository.findAll(
                PageRequest.of(page, recordsPerPage)
        );
    }

    public Page<CompetitionRecord> getActiveCompetitionsWithPagination(int page) {
        return competitionRepository.findActiveCompetitions(
                PageRequest.of(page, recordsPerPage)
        );
    }

    public Page<CompetitionRecord> getUserCompetitionsWithPagination(int page) {
        return competitionRepository.findUserActiveCompetitions(
                authenticationService.getAuthenticatedUser().getUuid(),
                PageRequest.of(page, recordsPerPage)
        );
    }

    public Page<CompetitionWithCategoriesResponse> getUserNotParticipatedCompetitionsWithPagination(int page) {
        return competitionRepository.findUserParticipateCompetitions(
                authenticationService.getAuthenticatedUser().getUuid(),
                PageRequest.of(page, recordsPerPage)
        ).map(c -> {
            return CompetitionWithCategoriesResponse.builder()
                    .competition(c)
                    .build();
        });
    }

    public Page<CompetitionRecord> getJuryActiveCompetitionsWithPagination(int page) {
        return competitionRepository.findJuryActiveCompetitions(PageRequest.of(page, recordsPerPage));
    }

    public CompetitionRecord getCompetitionByUuid(UUID uuid) {
        return competitionRepository
                .findById(uuid)
                .orElseThrow(() -> new EntityNotFoundException("Competition not found."));
    }
}
