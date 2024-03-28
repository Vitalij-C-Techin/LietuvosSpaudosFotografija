package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.service.PhotoService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Path;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PhotoFileController {

    private final PhotoService photoService;

    @GetMapping("/photo/{filename}")
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