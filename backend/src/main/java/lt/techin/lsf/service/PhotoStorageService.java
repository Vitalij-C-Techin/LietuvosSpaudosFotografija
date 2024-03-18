package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PhotoStorageService {
    private final FileStorageService fileStorageService;

    public boolean save(String path, String fileName, MultipartFile file) {
        return fileStorageService.save(path, fileName, file);
    }

    public Resource get(String filePath) {
        return fileStorageService.load(filePath);
    }

    public boolean remove(String path) {
        return fileStorageService.remove(path);
    }

    public boolean exists(String path) {
        return fileStorageService.exists(path);
    }
}