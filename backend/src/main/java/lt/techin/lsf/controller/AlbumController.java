package lt.techin.lsf.controller;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.requests.CreateAlbumRequest;
import lt.techin.lsf.model.requests.UpdateAlbumRequest;
import lt.techin.lsf.model.requests.UpdatePhotoRequest;
import lt.techin.lsf.persistance.model.AlbumRecord;
import lt.techin.lsf.persistance.model.PhotoRecord;
import lt.techin.lsf.service.AlbumService;
import lt.techin.lsf.service.PhotoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/album")
@CrossOrigin(origins = "http://localhost:5173")
public class AlbumController {
    private final AlbumService albumService;
    private final PhotoService photoService;

    @PostMapping
    public ResponseEntity<AlbumRecord> createAlbum(
            @RequestBody CreateAlbumRequest request
    ) {
        AlbumRecord album = albumService.createAlbum(request);

        if (null == album) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok().body(album);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<AlbumRecord> getAlbum(
            @PathVariable UUID uuid
    ) {
        AlbumRecord album = albumService.getAlbum(uuid);

        if (null == album) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(album);
    }

    @PutMapping("/{uuid}")
    public ResponseEntity<AlbumRecord> updateAlbum(
            @PathVariable UUID uuid,
            @RequestBody UpdateAlbumRequest request
    ) {
        AlbumRecord album = albumService.getAlbum(uuid);

        if (null == album) {
            return ResponseEntity.notFound().build();
        }

        album = albumService.updateAlbum(uuid, request);

        return ResponseEntity.ok().body(album);
    }

    @DeleteMapping("/{uuid}")
    public void deleteAlbum(
            @PathVariable UUID uuid
    ) {
        albumService.deleteAlbum(uuid);
    }

    @PostMapping("/{uuid}/add")
    public ResponseEntity<PhotoRecord> addPhoto(
            @PathVariable("uuid") UUID albumUuid,
            @RequestParam("image") MultipartFile file
    ) {
        AlbumRecord album = albumService.getAlbum(albumUuid);

        if (null == album) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(
                albumService.addPhoto(album, file)
        );
    }

    @PostMapping("/{uuid}/add/multiple")
    public ResponseEntity<List<PhotoRecord>> addPhoto(
            @PathVariable("uuid") UUID albumUuid,
            @RequestParam("image") MultipartFile[] file
    ) {
        AlbumRecord album = albumService.getAlbum(albumUuid);

        if (null == album) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(
                albumService.addPhoto(album, file)
        );
    }

    @GetMapping("/photo/{uuid}")
    public ResponseEntity<PhotoRecord> getPhoto(
            @PathVariable("uuid") UUID photoUuid,
            @RequestBody UpdatePhotoRequest request
    ) {
        PhotoRecord photo = photoService.getPhoto(photoUuid);

        if (null == photo) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(photo);
    }

    @PutMapping("/photo/{uuid}")
    public ResponseEntity<PhotoRecord> updatePhoto(
            @PathVariable("uuid") UUID photoUuid,
            @RequestBody UpdatePhotoRequest request
    ) {
        PhotoRecord photo = photoService.getPhoto(photoUuid);

        if (null == photo) {
            return ResponseEntity.notFound().build();
        }

        photo = photoService.updatePhoto(photo, request);

        return ResponseEntity.ok().body(photo);
    }

    @DeleteMapping("/photo/{uuid}")
    public void deletePhoto(
            @PathVariable("uuid") UUID photoUuid
    ) {
        photoService.deletePhoto(photoUuid);
    }
}
