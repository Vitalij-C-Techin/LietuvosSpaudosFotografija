package lt.techin.lsf.model;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lt.techin.lsf.service.PhotoResizeService;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public class ImageData {

    @Getter
    private MultipartFile file;

    @Setter
    private String name;

    public ImageData(@NotNull MultipartFile file) {
        this.file = file;

        setName(UUID.randomUUID().toString());
    }

    public String getName() {
        return name + "." + getFormat();
    }

    public String getName(String name) {
        return name + "." + getFormat();
    }

    public String getNameWithType(String type) {
        return name + "-" + type + "." + getFormat();
    }

    public int getWidth() {
        return PhotoResizeService.map(file).getWidth();
    }

    public int getHeight() {
        return PhotoResizeService.map(file).getHeight();
    }

    public long getSize() {
        return file.getSize();
    }

    public String getFormat() {
        return file.getContentType().split("/")[1];
    }

    public boolean isImage() {
        return file.getContentType().split("/")[0].equals("image");
    }
}
