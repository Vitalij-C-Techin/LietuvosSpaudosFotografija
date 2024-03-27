package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.Category;
import lt.techin.lsf.model.User;
import lt.techin.lsf.model.response.UserSubmissionResponse;
import lt.techin.lsf.persistance.model.AlbumRecord;
import lt.techin.lsf.persistance.model.CategoryRecord;
import lt.techin.lsf.persistance.model.SubmissionRecord;
import lt.techin.lsf.service.AlbumService;
import lt.techin.lsf.service.AuthenticationService;
import lt.techin.lsf.service.CategoryService;
import lt.techin.lsf.service.SubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/submission")
@CrossOrigin(origins = "http://localhost:5173")
public class SubmissionController {
    private final AuthenticationService authenticationService;
    private final SubmissionService submissionService;
    private final CategoryService categoryService;
    private final AlbumService albumService;

    @GetMapping("/{uuid}")
    public ResponseEntity<UserSubmissionResponse> getSubmission(
            @PathVariable("uuid") UUID categoryUuid
    ) {
        User user = authenticationService.getAuthenticatedUser();

        Category category = categoryService.getCategory(categoryUuid);
        if (null == category) {
            throw new NotFoundException("Category not found");
        }

        SubmissionRecord submission = submissionService.getUserSubmission(user.getUuid(), category.getUuid());

        if (null == submission) {
            submission = submissionService.create(
                    SubmissionRecord.builder()
                            .participantUuid(user.getUuid())
                            .categoryUuid(category.getUuid())
                            .competitionUuid(category.getCompetitionUuid())
                            .build()
            );
        }

        List<AlbumRecord> albums = albumService.getAlbumBySubmission(submission.getUuid());

        if (albums.size() <= 0) {
            AlbumRecord album = albumService.createAlbum(null);

            album.setSubmission(submission);
            albumService.saveAlbum(album);

            albums.add(album);
        }

        return ResponseEntity.ok().body(
                UserSubmissionResponse.builder()
                        .submission(submission)
                        .albums(albums)
                        .build()
        );
    }
}
