import { useReducer } from "react";
import Axios from "axios";
import { Match } from "../../types/Match";
import { currentScoreReducer } from "../../reducer/currentScoreReducer";
import SetScoreForm from "../../../../SetScoreForm";
import { Type } from "../../user/types";
import { User } from "../../../../Ranking/types";
import { countPoints } from "./functions/countPoints";

type Props = {
  match: Match;
  correctType: Type | undefined;
};

const ChangeScoreAdmin = ({ match, correctType }: Props) => {
  const [currentScore, dispatchCurrentScore] = useReducer(
    currentScoreReducer,
    match
  );

  const sumPoints = (matchId: number) => {
    Axios.get("https://betgit.wiktorrudzki.pl/api/correctTypes/getByMatchId", {
      headers: {
        matchId: matchId,
        authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res.data.data);
      const correctType = res.data.data;
      if (res.data.taken) {
        Axios.get("https://betgit.wiktorrudzki.pl/api/user/").then(
          (response) => {
            if (response.data.get) {
              response.data.data.forEach((user: User) => {
                console.log(user);
                Axios.get(
                  "https://betgit.wiktorrudzki.pl/api/types/getByMatchIdAndUserId",
                  {
                    headers: {
                      authorization: localStorage.getItem("token"),
                      userId: user.id,
                      matchId: match.id,
                    },
                  }
                ).then((res) => {
                  if (res.data.taken) {
                    const userType = res.data.data;
                    console.log(user, userType, correctType);
                    const points = countPoints(userType, correctType);
                    console.log(points);
                    Axios.patch(
                      "https://betgit.wiktorrudzki.pl/api/types/addPoints",
                      {
                        id: userType[0].id,
                        points: points,
                      },
                      {
                        headers: {
                          authorization: localStorage.getItem("token"),
                        },
                      }
                    ).then((response) => {
                      if (response.data.added) {
                        console.log("adding points to user");
                        Axios.patch(
                          "https://betgit.wiktorrudzki.pl/api/user/addPoints",
                          {
                            points: points,
                            userId: user.id,
                          },
                          {
                            headers: {
                              authorization: localStorage.getItem("token"),
                            },
                          }
                        ).then((res) => {
                          console.log(res.data.message);
                        });
                      }
                    });
                  } else {
                    console.log(res.data.message);
                  }
                });
              });
            } else {
              console.log(response.data.message);
            }
          }
        );
      } else {
        console.log(res.data.message);
      }
    });
  };

  const addScore = (e: React.FormEvent) => {
    e.preventDefault();

    Axios.get("https://betgit.wiktorrudzki.pl/api/correctTypes/", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }).then((res) => {
      if (
        res.data.data.filter(
          (match: Type) =>
            match.team1 === currentScore.team1 &&
            match.team2 === currentScore.team2
        ).length > 0
      ) {
        Axios.patch(
          `https://betgit.wiktorrudzki.pl/api/correctTypes/add`,
          {
            matchId: match.id,
            team1_score: currentScore.team1_score,
            team2_score: currentScore.team2_score,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        ).then((res) => {
          if (res.data.set) {
            sumPoints(res.data.matchId);
          } else {
            console.log(res.data.message);
          }
        });
      } else {
        Axios.post(
          `https://betgit.wiktorrudzki.pl/api/correctTypes/add`,
          {
            matchId: match.id,
            team1: currentScore.team1,
            team2: currentScore.team2,
            team1_score: currentScore.team1_score,
            team2_score: currentScore.team2_score,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        ).then((res) => {
          if (res.data.set) {
            sumPoints(res.data.matchId);
          } else {
            console.log(res.data.message);
          }
        });
      }
    });
  };

  return (
    <SetScoreForm
      match={match}
      dispatch={dispatchCurrentScore}
      currentScore={currentScore}
      onSubmit={addScore}
      type={correctType}
    />
  );
};

export default ChangeScoreAdmin;
