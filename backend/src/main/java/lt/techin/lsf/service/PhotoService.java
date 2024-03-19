package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.FileData;
import lt.techin.lsf.persistance.model.PhotoRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoStorageService photoStorageService;
    private final PhotoResizeService photoResizeService;

    public void savePhotoFile(
            UUID albumUuid,
            MultipartFile file
    ) {
        FileData imgData = new FileData(file);

        if (!imgData.isImage()) {
            return;
        }

        PhotoRecord photoRecord = PhotoRecord.builder()
                .uuid(UUID.randomUUID())
                .albumUuid(albumUuid)
                .build();

        BufferedImage imageSource = PhotoResizeService.map(file);
        File fileSource = PhotoResizeService.mapBufferedImageToFile(imageSource, "image", imgData.getExtension());
        photoStorageService.save(
                getStoragePath(),
                imgData.getName(photoRecord.getUuid() + "-source"),
                fileSource
        );

        BufferedImage imageSmall = photoResizeService.resize(file, 500);
        File fileSmall = PhotoResizeService.mapBufferedImageToFile(imageSmall);
        photoStorageService.save(
                getStoragePath(),
                photoRecord.getUuid() + "-small.jpg",
                fileSmall
        );

        BufferedImage imageLarge = photoResizeService.resize(file, 2000);
        File fileLarge = PhotoResizeService.mapBufferedImageToFile(imageLarge);
        photoStorageService.save(
                getStoragePath(),
                photoRecord.getUuid() + "-large.jpg",
                fileLarge
        );
    }

    public void savePhotoFiles(
            UUID albumUuid,
            MultipartFile[] files
    ) {

    }

    public File getPhotoFile(
            String filename
    ) {
        Path filePath = Path.of(getStoragePath(), filename);

        return photoStorageService.get(filePath.toString());
    }

    public boolean deletePhotoFile(
            String filename
    ) {
        Path filePath = Path.of(getStoragePath(), filename);

        return photoStorageService.remove(filePath.toString());
    }

    public static String getStoragePath() {
        return System.getProperty("user.dir") + "/../storage";
    }
}
