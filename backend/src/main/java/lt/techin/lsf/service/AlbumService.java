package lt.techin.lsf.service;

import lt.techin.lsf.persistance.AlbumRepository;
import lt.techin.lsf.persistance.model.AlbumRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
public class AlbumService {

    private AlbumRepository albumRepository;
    private PhotoService photoService;

    public void addPhoto(
            String uuid,
            MultipartFile file
    ) {
        AlbumRecord album = getAlbumRecord(UUID.fromString(uuid));

        if (null == album) {
            album = createAlbumRecord();
        }

        //createAlbumRecord().
    }


    public AlbumRecord a() {
        return null;
    }


    public AlbumRecord createAlbumRecord() {
        return AlbumRecord.builder()
                .uuid(UUID.randomUUID())
                .build();
    }


    public AlbumRecord getAlbumRecord(UUID uuid) {
        return albumRepository.getReferenceById(uuid);
    }

    public AlbumRecord updateAlbumRecord() {
        return null;
    }

    public void deleteAlbumRecord(UUID uuid) {
        albumRepository.deleteById(uuid);
    }
}
