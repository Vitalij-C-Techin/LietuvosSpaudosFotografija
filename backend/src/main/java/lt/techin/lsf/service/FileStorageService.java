package lt.techin.lsf.service;

import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    public boolean save(String path, String filename, File file) {
        createPath(path);

        try {
            Path uploadPath = Paths.get(path);
            Path filePath = uploadPath.resolve(filename);

            InputStream inputStream = new ByteArrayInputStream(
                    Files.readAllBytes(
                            file.toPath()
                    )
            );

            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);

            return true;
        } catch (Exception ignored) {

        }

        return false;
    }

    public File load(String path) {
        try {
            File file = new File(path);

            if (file.exists() || file.canRead()) {
                return file;
            }
        } catch (Exception ignored) {

        }

        return null;
    }

    public boolean remove(String path) {
        try {
            Files.deleteIfExists(
                    Paths.get(path)
            );

            return true;
        } catch (Exception ignored) {

        }

        return false;
    }

    public boolean exists(String path) {
        return Files.exists(
                Path.of(path)
        );
    }

    public boolean createPath(String path) {
        try {
            Files.createDirectories(
                    Paths.get(path)
            );

            return true;
        } catch (IOException ignored) {

        }

        return false;
    }
}
