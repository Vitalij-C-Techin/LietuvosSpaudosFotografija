package lt.techin.lsf.model.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lt.techin.lsf.model.ParticipationRequest;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateParticipationRequest {
    @NotBlank (message = "Field cannot be empty")
    private ParticipationRequest.Status status;
}
