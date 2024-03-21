package lt.techin.lsf.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Service
public class PhotoResizeService {

    public BufferedImage resize(BufferedImage image, int size) {
        return process(image, size);
    }

    public BufferedImage resize(MultipartFile file, int size) {
        return resize(
                map(file),
                size
        );
    }

    public BufferedImage resize(File file, int size) {
        return resize(
                map(file),
                size
        );
    }

    public BufferedImage process(BufferedImage source, int size) {
        float widthRatio = (float) size / source.getWidth();
        float heightRatio = (float) size / source.getHeight();

        float ratio = Math.max(widthRatio, heightRatio);

        int width = Math.round(source.getWidth() * ratio);
        int height = Math.round(source.getHeight() * ratio);

        int posX = (size / 2) - (width / 2);
        int posY = (size / 2) - (height / 2);

        BufferedImage img = new BufferedImage(size, size, Image.SCALE_SMOOTH);

        Graphics2D g = img.createGraphics();
        g.drawImage(source, posX, posY, width, height, null);
        g.dispose();

        return img;
    }

    public static BufferedImage map(File file) {
        try {
            return ImageIO.read(file);
        } catch (IOException ignored) {

        }

        return null;
    }

    public static BufferedImage map(MultipartFile file) {
        try {
            return ImageIO.read(file.getInputStream());
        } catch (Exception ignored) {

        }

        return null;
    }

    public static File mapBufferedImageToFile(BufferedImage image) {
        return mapBufferedImageToFile(image, "image", "jpg");
    }

    public static File mapBufferedImageToFile(BufferedImage image, String name, String format) {
        try {
            File file = new File(name);

            ImageIO.write(image, format, new File(name));

            return file;
        } catch (Exception ignored) {

        }

        return null;
    }
}
