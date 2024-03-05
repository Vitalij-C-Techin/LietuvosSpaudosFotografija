package lt.techin.lsf.controller;

import jakarta.validation.Valid;
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
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category createCategory(
            @RequestBody @Valid CategoryRequest category) {

        return categoryService.createCategory(category);
    }

    @GetMapping("/{uuid}")
    public Category getCategory(
            @PathVariable UUID uuid
    ) {
        return categoryService.getCategory(uuid);
    }

    @PutMapping("/{uuid}")
    public Category updateCategory(
            @PathVariable UUID uuid,
            @RequestBody CategoryRequest category
    ) {
        return categoryService.updateCategory(uuid, category);
    }

    @DeleteMapping("/{uuid}")
    public void deleteCategory(
            @PathVariable UUID uuid
    ) {
        categoryService.deleteCategory(uuid);
    }
}
