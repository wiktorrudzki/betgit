import { Match } from "../types/Match";

export type CurrentScoreActions =
  | { type: "team1_score"; payload: string }
  | { type: "team2_score"; payload: string };

export const currentScoreReducer = (state: Match, action: CurrentScoreActions) => {
  switch (action.type) {
    case "team1_score":
      return { ...state, team1_score: action.payload };
    case "team2_score":
      return { ...state, team2_score: action.payload };
    default:
      return state;
  }
};
