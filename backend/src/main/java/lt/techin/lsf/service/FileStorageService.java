package lt.techin.lsf.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    public boolean save(String path, String filename, MultipartFile file) {
        if (!createPath(path)) {
            return false;
        }

        Path uploadPath = Paths.get(path);

        try (InputStream inputStream = file.getInputStream()) {

            Path filePath = uploadPath.resolve(filename);

            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ioe) {
            return false;
        }

        return true;
    }

    public Resource load(String file) {
        try {
            Path p = Path.of(file);

            Resource resource = new UrlResource(p.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
        } catch (MalformedURLException ignored) {
        }

        return null;
    }

    public boolean remove(String path){
        try {
            Files.deleteIfExists(Paths.get(path));
        } catch (IOException e) {
            return false;
        }

        return true;
    }

    public boolean exists(String filePath) {
        return Files.exists(Path.of(filePath));
    }

    public boolean createPath(String path) {
        try {
            Files.createDirectories(
                    Paths.get(path)
            );
        } catch (IOException e) {
            return false;
        }

        return true;
    }
}
