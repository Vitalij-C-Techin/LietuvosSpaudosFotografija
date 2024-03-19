package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.service.PhotoService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Path;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/photo")
@CrossOrigin(origins = "http://localhost:5173")
public class PhotoController {

    private final PhotoService photoService;

    @PostMapping
    public void uploadPhoto(
            @RequestParam("image") MultipartFile file
    ) {
        photoService.savePhotoFile(UUID.randomUUID(), file);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getPhoto(
            @PathVariable String filename
    ) {
        File file = photoService.getPhotoFile(filename);

        URI uri = Path.of(file.getPath()).toUri();

        try {
            Resource resource = new UrlResource(uri);

            return ResponseEntity.ok()
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"" + file.getName() + "\""
                    )
                    .body(resource);
        } catch (MalformedURLException ignored) {

        }

        return ResponseEntity.notFound().build();
    }
}