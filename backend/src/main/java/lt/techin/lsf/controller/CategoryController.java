package lt.techin.lsf.controller;

import jakarta.validation.Valid;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.requests.CreateCategoryRequest;
import lt.techin.lsf.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
            @RequestBody @Valid CreateCategoryRequest category) {

        return categoryService.createCategory(category);
    }
}
