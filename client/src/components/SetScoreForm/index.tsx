import { useUser } from "../../hooks/useUser";
import { CurrentScoreActions } from "../Home/components/reducer/currentScoreReducer";
import { Match } from "../Home/components/types/Match";

type Props = {
  match: Match;
  dispatch: React.Dispatch<CurrentScoreActions>;
  currentScore: Match;
  onSubmit: (e: React.FormEvent) => void;
};

const SetScoreForm = ({ match, dispatch, currentScore, onSubmit }: Props) => {
  const { currentUser } = useUser();

  return (
    <form className="change-score-form">
      <div className="change-score-form-child change-score-form-child-time">
        {new Date(match.match_time).toString().slice(4, 21)}
      </div>
      <span className="change-score-form-child change-score-form-child-teams">
        {match.team1} - {match.team2}
      </span>
      <div className="change-score-form-child change-score-form-child-input">
        <input
          style={{ width: "3em" }}
          className="form-input"
          onChange={(e) => {
            dispatch({
              type: "team1_score",
              payload: e.target.value,
            });
          }}
          value={currentScore.team1_score?.toString()}
        />
        <span style={{ margin: "0 0.5em" }}> : </span>
        <input
          style={{ width: "3em" }}
          className="form-input"
          onChange={(e) => {
            dispatch({
              type: "team2_score",
              payload: e.target.value,
            });
          }}
          value={currentScore.team2_score?.toString()}
        />
      </div>
      <div className="change-score-form-child change-score-form-child-btn">
        <button
          style={{ width: "50%", fontSize: "0.7em" }}
          className={`submit-btn ${
            currentScore.team1_score == null ||
            currentScore.team2_score == null ||
            currentUser === null
              ? "disable-submit-btn"
              : ""
          }`}
          onClick={onSubmit}
          type="submit"
        >
          Dodaj
        </button>
      </div>
    </form>
  );
};

export default SetScoreForm;
