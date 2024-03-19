package lt.techin.lsf.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@AllArgsConstructor
public class FileData {

    private MultipartFile file;

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
