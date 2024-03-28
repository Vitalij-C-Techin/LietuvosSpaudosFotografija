package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.requests.UpdatePhotoRequest;
import lt.techin.lsf.persistance.model.PhotoRecord;
import lt.techin.lsf.service.PhotoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/photo")
@CrossOrigin(origins = "http://localhost:5173")
public class PhotoController {
    private final PhotoService photoService;

    @PostMapping
    public ResponseEntity<PhotoRecord> addPhoto(
            @RequestParam("image") MultipartFile file
    ) {
        PhotoRecord photo = photoService.savePhoto(file);

        if (null == photo) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body(photo);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<PhotoRecord> getPhoto(
            @PathVariable UUID uuid
    ) {
        PhotoRecord photo = photoService.getPhoto(uuid);

        if (null == photo) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(photo);
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<PhotoRecord> updatePhoto(
            @PathVariable UUID uuid,
            @RequestBody UpdatePhotoRequest request
    ) {
        PhotoRecord photo = photoService.getPhoto(uuid);

        if (null == photo) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(
                photoService.updatePhoto(photo, request)
        );
    }


    @DeleteMapping("/{uuid}")
    public void deletePhoto(
            @PathVariable UUID uuid
    ) {
        photoService.deletePhoto(uuid);
    }
}
