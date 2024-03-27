package lt.techin.lsf.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.requests.CategoryRequest;
import lt.techin.lsf.persistance.model.CompetitionRecord;
import lt.techin.lsf.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.UUID;
import java.util.stream.Stream;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CategoryControllerTests {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CategoryService serviceMock;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @WithMockUser(roles = "ADMIN")
    void createCategory() throws Exception {
        CategoryRequest mockRequest = CategoryRequest.builder()
                .categoryNameLt("Name_lt")
                .categoryNameEn("Name_en")
                .categoryDescriptionLt("Description_lt")
                .categoryDescriptionEn("Description_en")
                .albumType("Single")
                .photoLimit(1)
                .build();

        CompetitionRecord mockCompetitionRecord = new CompetitionRecord();
        mockCompetitionRecord.setUuid(UUID.randomUUID());

        Category mockCategory = Category.builder()
                .uuid(UUID.randomUUID())
                .nameLt(mockRequest.getCategoryNameLt())
                .nameEn(mockRequest.getCategoryNameEn())
                .descriptionLt(mockRequest.getCategoryDescriptionLt())
                .descriptionEn(mockRequest.getCategoryDescriptionEn())
                .albumType(mockRequest.getAlbumType())
                .photoLimit(mockRequest.getPhotoLimit())
                .competitionUuid(mockCompetitionRecord.getUuid())
                .build();

        given(serviceMock.getCompetitionByUuid(mockCompetitionRecord.getUuid())).willReturn(mockCompetitionRecord);

        given(serviceMock.createCategoryAndAddToCompetition(eq(mockCompetitionRecord), any(CategoryRequest.class))).willReturn(mockCategory);

        mvc.perform(post("http://localhost:8080/api/v1/category/competition/{competitionUuid}", mockCompetitionRecord.getUuid().toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockRequest)))
                .andExpect(status().isOk());

        verify(serviceMock, times(1)).createCategoryAndAddToCompetition(eq(mockCompetitionRecord), any(CategoryRequest.class));
    }

    @ParameterizedTest
    @MethodSource("invalidRequests")
    @WithMockUser(roles = "ADMIN")
    void invalidCategoryCreation(CategoryRequest request) throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("http://localhost:8080/api/v1/category/competition/{competitionUuid}", UUID.randomUUID())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }

    static Stream<CategoryRequest> invalidRequests() {
        return Stream.of(
                CategoryRequest.builder()
                        .categoryNameLt("")
                        .categoryNameEn("Name_en")
                        .categoryDescriptionLt("Description_lt")
                        .categoryDescriptionEn("Description_en")
                        .albumType("Single")
                        .photoLimit(1)
                        .build(),
                CategoryRequest.builder()
                        .categoryNameLt("Name_lt")
                        .categoryNameEn("")
                        .categoryDescriptionLt("Description_lt")
                        .categoryDescriptionEn("Description_en")
                        .albumType("Single")
                        .photoLimit(1)
                        .build(),
                CategoryRequest.builder()
                        .categoryNameLt("Name_lt")
                        .categoryNameEn("Name_en")
                        .categoryDescriptionLt("")
                        .categoryDescriptionEn("Description_en")
                        .albumType("Single")
                        .photoLimit(1)
                        .build(),
                CategoryRequest.builder()
                        .categoryNameLt("Name_lt")
                        .categoryNameEn("Name_en")
                        .categoryDescriptionLt("Description_lt")
                        .categoryDescriptionEn("")
                        .albumType("Single")
                        .photoLimit(1)
                        .build(),
                CategoryRequest.builder()
                        .categoryNameLt("Name_lt")
                        .categoryNameEn("Name_en")
                        .categoryDescriptionLt("Description_lt")
                        .categoryDescriptionEn("Description_en")
                        .albumType("")
                        .photoLimit(1)
                        .build(),
                CategoryRequest.builder()
                        .categoryNameLt("Name_lt")
                        .categoryNameEn("Name_en")
                        .categoryDescriptionLt("Description_lt")
                        .categoryDescriptionEn("Description_en")
                        .albumType("")
                        .photoLimit(0)
                        .build()
        );
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getCategory() throws Exception {
        UUID categoryUuid = UUID.randomUUID();
        Category mockCategory = new Category();
        mockCategory.setUuid(categoryUuid);

        given(serviceMock.getCategory(any(UUID.class))).willReturn(mockCategory);

        mvc.perform(get("http://localhost:8080/api/v1/category/{categoryUuid}", categoryUuid.toString()))
                .andExpect(status().isOk());

        verify(serviceMock, times(1)).getCategory(categoryUuid);
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void updateCategory() throws Exception {
        CategoryRequest mockUpdateRequest = CategoryRequest.builder()
                .categoryNameLt("Name_lt_updated")
                .categoryNameEn("Name_en_updated")
                .categoryDescriptionLt("Description_lt_updated")
                .categoryDescriptionEn("Description_en_updated")
                .albumType("Single")
                .photoLimit(1)
                .build();

        UUID categoryUuid = UUID.randomUUID();
        Category mockCategory = new Category();
        mockCategory.setUuid(categoryUuid);

        given(serviceMock.updateCategory(eq(categoryUuid), any(CategoryRequest.class))).willReturn(mockCategory);

        mvc.perform(put("http://localhost:8080/api/v1/category/{categoryUuid}", categoryUuid.toString())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockUpdateRequest)))
                .andExpect(status().isOk());

        verify(serviceMock, times(1)).updateCategory(eq(categoryUuid), any(CategoryRequest.class));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void deleteCategory() throws Exception {
        UUID categoryUuid = UUID.randomUUID();
        Category mockCategory = new Category();
        mockCategory.setUuid(categoryUuid);

        mvc.perform(delete("http://localhost:8080/api/v1/category/{categoryUuid}", categoryUuid.toString()))
                .andExpect(status().isOk());

        verify(serviceMock, times(1)).deleteCategoryAndUpdateCompetition(categoryUuid);
    }
}