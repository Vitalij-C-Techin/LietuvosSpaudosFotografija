package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.persistance.AlbumRepository;
import lt.techin.lsf.persistance.PhotoRepository;
import lt.techin.lsf.persistance.model.AlbumRecord;
import lt.techin.lsf.persistance.model.PhotoRecord;
import lt.techin.lsf.service.AlbumService;
import lt.techin.lsf.service.PhotoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/album")
@CrossOrigin(origins = "http://localhost:5173")
public class AlbumController {

    private final AlbumRepository albumRepository;
    private final PhotoRepository photoRepository;

    private final AlbumService albumService;
    private final PhotoService photoService;

    @PostMapping("/test")
    public AlbumRecord test(
            @RequestParam("image") MultipartFile file
    ) {
        AlbumRecord album = new AlbumRecord();
        albumRepository.save(album);

        PhotoRecord photo = new PhotoRecord();
        photo.setAlbum(album);
        photoRepository.save(photo);

        photoService.save(photo, file);

        return album;
    }

    @GetMapping("/test/{uuid}")
    public Object test(
            @PathVariable UUID uuid
    ) {
        return albumRepository.findByUuid(uuid);
    }
}
