package lt.techin.lsf.service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lt.techin.lsf.model.requests.CreateAlbumRequest;
import lt.techin.lsf.model.requests.UpdateAlbumRequest;
import lt.techin.lsf.persistance.AlbumRepository;
import lt.techin.lsf.persistance.PhotoRepository;
import lt.techin.lsf.persistance.SubmissionRepository;
import lt.techin.lsf.persistance.model.AlbumRecord;
import lt.techin.lsf.persistance.model.PhotoRecord;
import lt.techin.lsf.persistance.model.SubmissionRecord;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AlbumService {

    private final AlbumRepository albumRepository;
    private final PhotoRepository photoRepository;
    private final SubmissionRepository submissionRepository;
    private final PhotoService photoService;

    public AlbumRecord createAlbum(
            CreateAlbumRequest request
    ) {
        if (null == request) {
            return albumRepository.save(new AlbumRecord());
        }

        AlbumRecord album = AlbumRecord.builder()
                .nameLt(request.getNameLt())
                .nameEn(request.getNameEn())
                .descriptionLt(request.getDescriptionLt())
                .descriptionEn(request.getDescriptionEn())
                .type(request.getType())
                .status(request.getStatus())
                .build();

        Optional<SubmissionRecord> submissionOptional = submissionRepository.findById(request.getSubmissionUuid());
        if (submissionOptional.isPresent()) {
            SubmissionRecord submissionRecord = submissionOptional.get();
            album.setSubmission(submissionRecord);
        } else {
            throw new EntityNotFoundException("Submission not found.");
        }
        return albumRepository.save(album);
    }

    public AlbumRecord getAlbum(
            UUID uuid
    ) {
        return albumRepository.findByUuid(uuid);
    }

    public AlbumRecord updateAlbum(
            AlbumRecord album,
            UpdateAlbumRequest request
    ) {
        if (null == album) {
            return null;
        }

        Optional<SubmissionRecord> submissionOptional = submissionRepository.findById(request.getSubmissionUuid());
        if (submissionOptional.isPresent()) {
            SubmissionRecord submissionRecord = submissionOptional.get();
            album.setSubmission(submissionRecord);
        } else {
            throw new EntityNotFoundException("Submission not found.");
        }

        album.setNameLt(request.getNameLt());
        album.setNameEn(request.getNameEn());
        album.setDescriptionLt(request.getDescriptionLt());
        album.setDescriptionEn(request.getDescriptionEn());
        album.setType(request.getType());
        album.setStatus(request.getStatus());

        albumRepository.save(album);

        return album;
    }

    public AlbumRecord updateAlbum(
            UUID uuid,
            UpdateAlbumRequest request
    ) {
        return updateAlbum(getAlbum(uuid), request);
    }

    public boolean deleteAlbum(
            AlbumRecord album
    ) {
        if (null == album) {
            return false;
        }

        photoService.deletePhoto(album);
        albumRepository.delete(album);

        return true;
    }

    public boolean deleteAlbum(
            UUID uuid
    ) {
        AlbumRecord album = getAlbum(uuid);

        if (null == album) {
            return false;
        }

        return deleteAlbum(album);
    }

    public PhotoRecord addPhoto(
            AlbumRecord album,
            MultipartFile file
    ) {
        if (null == album) {
            return null;
        }

        PhotoRecord photo = photoService.savePhoto(file);
        photo.setAlbum(album);

        photoRepository.save(photo);

        return photo;
    }

    public PhotoRecord addPhoto(
            UUID uuid,
            MultipartFile file
    ) {
        return addPhoto(getAlbum(uuid), file);
    }

    public List<PhotoRecord> addPhoto(
            AlbumRecord album,
            MultipartFile[] files
    ) {
        return Arrays.stream(files)
                .map(file -> {
                    return addPhoto(album, file);
                })
                .toList();
    }

    public List<PhotoRecord> addPhoto(
            UUID uuid,
            MultipartFile[] files
    ) {
        return addPhoto(getAlbum(uuid), files);
    }
}
