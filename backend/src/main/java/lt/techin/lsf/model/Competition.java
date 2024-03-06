package lt.techin.lsf.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lt.techin.lsf.persistance.model.CompetitionRecord;

@Getter
@AllArgsConstructor
public class Competition {
    private final CompetitionRecord data;

    public enum Status{
        NONE,
        COMING,
        GOING,
        EVALUATES,
        FINISHED
    }

    public enum Visibility{
        PRIVATE,
        PUBLIC
    }
}
