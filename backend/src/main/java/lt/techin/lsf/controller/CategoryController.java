package lt.techin.lsf.controller;

import jakarta.validation.Valid;
import lt.techin.lsf.model.requests.CategoryRequest;
import lt.techin.lsf.model.response.CategoryResponse;
import lt.techin.lsf.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1")
@CrossOrigin(origins = "http://localhost:5173")
@Validated
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/categories")
    public CategoryResponse createCategory(
            @RequestBody @Valid CategoryRequest categoryRequest) {

        CategoryResponse response = categoryService.createCategory(categoryRequest);

        return response;
    }
}
