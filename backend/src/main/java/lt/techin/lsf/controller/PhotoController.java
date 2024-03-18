package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.service.PhotoService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

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
        photoService.savePhotoFile(file);
    }

    @GetMapping("/{filename}")
    public ResponseEntity<Resource> getPhoto(
            @PathVariable String filename
    ) {
        Resource file = photoService.getPhotoFile(filename);


        if (null == file) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + filename + "\""
                )
                .body(file);
    }


}