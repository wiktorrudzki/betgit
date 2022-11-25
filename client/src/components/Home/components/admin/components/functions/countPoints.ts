import { Type } from "../../../user/types";

export const countPoints = (userType: Type[], correctType: Type[]) => {
  if (
    userType[0].team1_score !== null &&
    userType[0].team2_score !== null &&
    userType[0]
  ) {
    console.log("adding...");
    if (
      userType[0].team1_score === correctType[0].team1_score &&
      userType[0].team2_score === correctType[0].team2_score
    ) {
      return 4;
    } else if (
      userType[0].team1_score - userType[0].team2_score === 0 &&
      correctType[0].team1_score - correctType[0].team2_score === 0
    ) {
      return 3;
    } else if (
      userType[0].team1_score - userType[0].team2_score ===
      correctType[0].team1_score - correctType[0].team2_score
    ) {
      return 2;
    } else if (
      (userType[0].team1_score > userType[0].team2_score &&
        correctType[0].team1_score > correctType[0].team2_score) ||
      (userType[0].team2_score > userType[0].team1_score &&
        correctType[0].team2_score > correctType[0].team1_score)
    ) {
      return 1;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};
