export type NewMatchStatus = {
  team1: string;
  team2: string;
  matchTime: null | Date;
};

type Actions =
  | { type: "team1"; payload: string }
  | { type: "team2"; payload: string }
  | { type: "matchTime"; payload: null | Date }
  | { type: "clear" };

export const newMatchReducer = (state: NewMatchStatus, action: Actions) => {
  switch (action.type) {
    case "team1":
      return { ...state, team1: action.payload };
    case "team2":
      return { ...state, team2: action.payload };
    case "matchTime":
      return { ...state, matchTime: action.payload };
    case "clear":
      return {
        team1: "",
        team2: "",
        error: false,
        errorMessage: "",
        matchTime: null,
      };
    default:
      return state;
  }
};
