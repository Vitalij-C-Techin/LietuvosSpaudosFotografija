package lt.techin.lsf.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.requests.CategoryRequest;
import lt.techin.lsf.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("api/v1/category")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
@Slf4j
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/{competitionUuid}")
    public Category createCategory(
            @PathVariable UUID competitionUuid,
            @RequestBody @Valid CategoryRequest categoryRequest
    ) {
        return categoryService.createCategoryAndAddToCompetition(competitionUuid, categoryRequest);
    }

    @GetMapping("/{categoryUuid}")
    public Category getCategory(
            @PathVariable UUID categoryUuid
    ) {
        return categoryService.getCategory(categoryUuid);
    }

    @PutMapping("/{categoryUuid}")
    public Category updateCategory(
            @PathVariable UUID categoryUuid,
            @RequestBody @Valid CategoryRequest categoryRequest
    ) {
        return categoryService.updateCategory(categoryUuid, categoryRequest);
    }

    @DeleteMapping("/{categoryUuid}")
    public void deleteCategory(
            @PathVariable UUID categoryUuid
    ) {
        categoryService.deleteCategoryAndUpdateCompetition(categoryUuid);
    }

}
