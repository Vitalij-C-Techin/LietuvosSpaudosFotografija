package lt.techin.lsf.model;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

public class FileData {

    @Getter
    private MultipartFile file;

    public FileData(MultipartFile file) {
        this.file = file;
    }

    public MultipartFile getFile() {
        return file;
    }

    public String getName() {
        return file.getOriginalFilename();
    }

    public String getName(String name) {
        return name + "." + getExtension();
    }

    public boolean isImage() {
        return file.getContentType().split("/")[0].equals("image");
    }

    public String getExtension() {
        return file.getContentType().split("/")[1];
    }
}
