package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.FileData;
import lt.techin.lsf.persistance.PhotoItemRepository;
import lt.techin.lsf.persistance.PhotoRepository;
import lt.techin.lsf.persistance.model.AlbumRecord;
import lt.techin.lsf.persistance.model.PhotoItemRecord;
import lt.techin.lsf.persistance.model.PhotoRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Path;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final PhotoItemRepository photoItemRepository;

    private final PhotoStorageService photoStorageService;
    private final PhotoResizeService photoResizeService;

    public PhotoRecord save(
            MultipartFile file
    ) {
        FileData imgData = new FileData(file);

        if (!imgData.isImage()) {
            return null;
        }

        PhotoRecord photo = new PhotoRecord();

        save(photo, file);

        return photo;
    }

    public boolean save(
            PhotoRecord photo,
            MultipartFile file
    ) {
        FileData imgData = new FileData(file);

        if (!imgData.isImage()) {
            return false;
        }

        BufferedImage imageSource = PhotoResizeService.map(file);
        PhotoItemRecord imageSourceRecord = _savePhoto(imageSource, imgData.getName(photo.getUuid() + "-source"));

        imageSourceRecord.setFormat(imgData.getExtension());
        imageSourceRecord.setType("source");
        imageSourceRecord.setPhoto(photo);

        imageSourceRecord = photoItemRepository.save(imageSourceRecord);

        photo.addPhotoItem(imageSourceRecord);


        BufferedImage imageSmall = photoResizeService.resize(file, 500);
        PhotoItemRecord imageSmallRecord = _savePhoto(imageSmall, photo.getUuid() + "-small.jpg");

        imageSmallRecord.setFormat("jpg");
        imageSmallRecord.setType("small");
        imageSmallRecord.setPhoto(photo);

        imageSmallRecord = photoItemRepository.save(imageSmallRecord);

        photo.addPhotoItem(imageSmallRecord);


        BufferedImage imageLarge = photoResizeService.resize(file, 2000);
        PhotoItemRecord imageLargeRecord = _savePhoto(imageLarge, photo.getUuid() + "-large.jpg");

        imageLargeRecord.setFormat("jpg");
        imageLargeRecord.setType("large");
        imageLargeRecord.setPhoto(photo);

        imageLargeRecord = photoItemRepository.save(imageLargeRecord);

        photo.addPhotoItem(imageLargeRecord);

        return true;
    }

    private PhotoItemRecord _savePhoto(BufferedImage image, String name) {
        File file = PhotoResizeService.mapBufferedImageToFile(image);

        photoStorageService.save(
                getStoragePath(),
                name,
                file
        );

        return PhotoItemRecord.builder()
                .name(name)
                .width(image.getWidth())
                .height(image.getHeight())
                .size(file.length())
                .build();
    }

    public List<PhotoRecord> savePhotoFiles(
            AlbumRecord album,
            MultipartFile[] files
    ) {
        return null;
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
