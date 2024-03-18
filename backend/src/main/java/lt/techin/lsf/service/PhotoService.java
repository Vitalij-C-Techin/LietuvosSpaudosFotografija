package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.FileData;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;

@Service
@RequiredArgsConstructor
public class PhotoService {
    private final PhotoStorageService photoStorageService;

    public void savePhotoFile(
            MultipartFile file
    ) {
        FileData f = new FileData(file);

        boolean isSaved = photoStorageService.save(getStoragePath(), f.getName("hello-world"), file);
    }

    public boolean savePhotoFiles(
            MultipartFile[] files
    ) {
        return true;
    }

    public Resource getPhotoFile(
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
