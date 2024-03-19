package lt.techin.lsf.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
@RequiredArgsConstructor
public class PhotoStorageService {
    private final FileStorageService fileStorageService;

    public boolean save(String path, String fileName, File file) {
        return fileStorageService.save(path, fileName, file);
    }

    public File get(String path) {
        return fileStorageService.load(path);
    }

    public boolean remove(String path) {
        return fileStorageService.remove(path);
    }

    public boolean exists(String path) {
        return fileStorageService.exists(path);
    }
}