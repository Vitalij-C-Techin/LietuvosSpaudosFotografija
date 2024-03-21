package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.persistance.model.AlbumRecord;
import lt.techin.lsf.persistance.model.PhotoRecord;
import lt.techin.lsf.service.AlbumService;
import lt.techin.lsf.service.PhotoService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@RequestMapping("/api/v1/photo")
@CrossOrigin(origins = "http://localhost:5173")
public class PhotoController {
    private final AlbumService albumService;
    private final PhotoService photoService;

    @PostMapping("/add/{album_uuid}")
    public PhotoRecord uploadPhoto(
            @PathVariable UUID uuid,
            @RequestParam("image") MultipartFile file
    ) {


        return null;
    }


}
