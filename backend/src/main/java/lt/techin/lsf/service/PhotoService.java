package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.ImageData;
import lt.techin.lsf.model.requests.UpdatePhotoRequest;
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
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final PhotoItemRepository photoItemRepository;

    private final PhotoStorageService photoStorageService;
    private final PhotoResizeService photoResizeService;

    public PhotoRecord savePhoto(
            MultipartFile file
    ) {
        ImageData imgData = new ImageData(file);

        if (!imgData.isImage()) {
            return null;
        }

        PhotoRecord photo = new PhotoRecord();
        photoRepository.save(photo);

        _processPhoto(photo, file);

        return photo;
    }

    public List<PhotoRecord> savePhoto(
            MultipartFile[] files
    ) {
        return Arrays.stream(files)
                .map(this::savePhoto)
                .toList();
    }

    public PhotoRecord getPhoto(
            UUID uuid
    ) {
        return photoRepository.findByUuid(uuid);
    }

    public List<PhotoRecord> getAlbumPhoto(
            UUID uuid
    ) {
        return photoRepository.findByAlbumUuid(uuid);
    }

    public PhotoRecord updatePhoto(
            PhotoRecord photo,
            UpdatePhotoRequest request
    ) {
        if (null == photo) {
            return null;
        }

        photo.setNameLt(request.getNameLt());
        photo.setNameEn(request.getNameEn());
        photo.setDescriptionLt(request.getDescriptionEn());
        photo.setDescriptionEn(request.getDescriptionEn());
        photo.setPosition(request.getPosition());
        photo.setStage(request.getStage());

        photoRepository.save(photo);

        return photo;
    }

    public PhotoRecord updatePhoto(
            UUID uuid,
            UpdatePhotoRequest request
    ) {
        return updatePhoto(getPhoto(uuid), request);
    }

    public List<PhotoRecord> updatePhoto(
            List<UpdatePhotoRequest> updates
    ) {
        return updates.stream()
                .map(update -> {
                    return updatePhoto(update.getUuid(), update);
                })
                .toList();
    }

    public boolean deletePhoto(
            PhotoRecord photo
    ) {
        if (null == photo) {
            return false;
        }

        photo.getPhotoItemList().forEach((item) -> {
            photoStorageService.remove(getStoragePath() + "/" + item.getName());

            photoItemRepository.delete(item);
        });

        photoRepository.delete(photo);

        return true;
    }

    public boolean deletePhoto(
            UUID uuid
    ) {
        return deletePhoto(
                getPhoto(uuid)
        );
    }

    public boolean deletePhoto(
            Set<PhotoRecord> records
    ) {
        records.forEach(this::deletePhoto);

        return true;
    }

    public boolean deletePhoto(
            List<UUID> uuids
    ) {
        uuids.forEach(this::deletePhoto);

        return true;
    }

    public boolean deletePhoto(
            AlbumRecord album
    ) {
        return deletePhoto(album.getPhotoList());
    }

    public boolean hasPhoto(
            UUID uuid
    ) {
        return null != getPhoto(uuid);
    }

    /* --- */

    public File getPhotoFile(String name) {
        return photoStorageService.get(getStoragePath() + "/" + name);
    }

    /* --- */

    private boolean _processPhoto(
            PhotoRecord photo,
            MultipartFile file
    ) {
        ImageData imageData = new ImageData(file);

        if (!imageData.isImage()) {
            return false;
        }

        imageData.setName(photo.getUuid().toString());

        /*
        Save Original
        */

        PhotoItemRecord itemSource = _saveImageSource(imageData);
        itemSource.setPhoto(photo);

        photoItemRepository.save(itemSource);

        photo.addPhotoItem(itemSource);

        /*
        Save large thumbnail
        */

        PhotoItemRecord itemLarge = _saveImageThumbnail(imageData, 2000, "large");
        itemLarge.setPhoto(photo);

        photoItemRepository.save(itemLarge);

        photo.addPhotoItem(itemLarge);

        /*
        Save small thumbnail
        */

        PhotoItemRecord itemSmall = _saveImageThumbnail(imageData, 500, "small");
        itemSmall.setPhoto(photo);

        photoItemRepository.save(itemSmall);

        photo.addPhotoItem(itemSmall);

        return true;
    }

    private PhotoItemRecord _saveImageSource(
            ImageData imageData
    ) {
        BufferedImage image = PhotoResizeService.map(imageData.getFile());

        File file = PhotoResizeService.mapBufferedImageToFile(
                image,
                imageData.getName(),
                imageData.getFormat()
        );

        _saveImageFile(file, imageData.getName());

        return PhotoItemRecord.builder()
                .name(imageData.getName())
                .width(image.getWidth())
                .height(image.getHeight())
                .size(file.length())
                .format(imageData.getFormat())
                .type("source")
                .build();
    }

    private PhotoItemRecord _saveImageThumbnail(
            ImageData imageData,
            int size,
            String imageType
    ) {
        String imageName = imageData.getNameWithType(imageType);

        BufferedImage image = photoResizeService.resize(imageData.getFile(), size);

        File file = PhotoResizeService.mapBufferedImageToFile(
                image,
                imageName,
                imageData.getFormat()
        );

        _saveImageFile(file, imageName);

        return PhotoItemRecord.builder()
                .name(imageName)
                .width(image.getWidth())
                .height(image.getHeight())
                .size(file.length())
                .format(imageData.getFormat())
                .type(imageType)
                .build();
    }

    private boolean _saveImageFile(
            File file,
            String name
    ) {
        return photoStorageService.save(
                getStoragePath(),
                name,
                file
        );
    }


    public static String getStoragePath() {
        return System.getProperty("user.dir") + "/../storage";
    }
}
