import * as React from "react";
import "../assets/css/constants.css";
import "../assets/css/styles.css";
import {
  BACKGROUND,
  NO_PLAYER,
  PINK,
  PLAYER_PINK,
  YELLOW,
  PLAYER_PINK_WINNING_SPOT,
  PLAYER_YELLOW_WINNING_SPOT,
} from "../utils/gameConst";
import { dropIntoPlace } from "../utils/dropPieces";

export default function SvgBoard({ board }) {
  const [hasRun, setHasRun] = React.useState(false);

  React.useEffect(() => {
    if (hasRun) return;

    const didWork = dropIntoPlace();
    setHasRun(true);

    if (!didWork) {
      setHasRun(false);
      setTimeout(dropIntoPlace(), 1000);
    }
  }, [hasRun]);

  React.useEffect(() => {
    console.log("board", board);
  }, [board]);

  if (!board.map) {
    return <p>Error no board: {JSON.stringify(board)}</p>
  } 

  return (
    <div className="svg-board-container">
      <svg
        viewBox="0 0 700 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        id="svg-box"
      >
        {" "}
        {/* 585 */}
        {board.map((row, indexY) => {
          // 6 rows
          // 7 columns
          return (
            <g key={`${indexY}`}>
              {row?.map((value, indexX) => {
                let fill =
                  value === NO_PLAYER
                    ? BACKGROUND
                    : value === PLAYER_PINK ||
                      value === PLAYER_PINK_WINNING_SPOT
                    ? PINK
                    : YELLOW;

                let cx = 85 * indexX + 40 + 25 + 30;
                let cy = 80.8 * indexY + 40 + 20 + 30 + 0.5;

                return (
                  <g key={`${indexX}${indexY}`} className="board-piece">
                    <circle r="32" cx={cx} cy={cy} fill={fill} />
                    {value === PLAYER_PINK_WINNING_SPOT ||
                    value === PLAYER_YELLOW_WINNING_SPOT ? (
                      <circle r="10" cx={cx} cy={cy} fill={BACKGROUND} />
                    ) : (
                      <></>
                    )}
                  </g>
                );
              })}
            </g>
          );
        })}
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 40C0 17.9086 17.9086 0 40 0H660C682.091 0 700 17.9086 700 40V545C700 567.091 682.091 585 660 585H40C17.9086 585 0 567.091 0 545V40ZM125 90C125 106.569 111.569 120 95 120C78.4314 120 65 106.569 65 90C65 73.4315 78.4314 60 95 60C111.569 60 125 73.4315 125 90ZM295 90C295 106.569 281.569 120 265 120C248.431 120 235 106.569 235 90C235 73.4315 248.431 60 265 60C281.569 60 295 73.4315 295 90ZM350 120C366.569 120 380 106.569 380 90C380 73.4315 366.569 60 350 60C333.431 60 320 73.4315 320 90C320 106.569 333.431 120 350 120ZM465 90C465 106.569 451.569 120 435 120C418.431 120 405 106.569 405 90C405 73.4315 418.431 60 435 60C451.569 60 465 73.4315 465 90ZM520 120C536.569 120 550 106.569 550 90C550 73.4315 536.569 60 520 60C503.431 60 490 73.4315 490 90C490 106.569 503.431 120 520 120ZM635 90C635 106.569 621.569 120 605 120C588.431 120 575 106.569 575 90C575 73.4315 588.431 60 605 60C621.569 60 635 73.4315 635 90ZM180 120C196.569 120 210 106.569 210 90C210 73.4315 196.569 60 180 60C163.431 60 150 73.4315 150 90C150 106.569 163.431 120 180 120ZM125 495C125 511.569 111.569 525 95 525C78.4314 525 65 511.569 65 495C65 478.431 78.4314 465 95 465C111.569 465 125 478.431 125 495ZM265 525C281.569 525 295 511.569 295 495C295 478.431 281.569 465 265 465C248.431 465 235 478.431 235 495C235 511.569 248.431 525 265 525ZM380 495C380 511.569 366.569 525 350 525C333.431 525 320 511.569 320 495C320 478.431 333.431 465 350 465C366.569 465 380 478.431 380 495ZM435 525C451.569 525 465 511.569 465 495C465 478.431 451.569 465 435 465C418.431 465 405 478.431 405 495C405 511.569 418.431 525 435 525ZM550 495C550 511.569 536.569 525 520 525C503.431 525 490 511.569 490 495C490 478.431 503.431 465 520 465C536.569 465 550 478.431 550 495ZM605 525C621.569 525 635 511.569 635 495C635 478.431 621.569 465 605 465C588.431 465 575 478.431 575 495C575 511.569 588.431 525 605 525ZM210 495C210 511.569 196.569 525 180 525C163.431 525 150 511.569 150 495C150 478.431 163.431 465 180 465C196.569 465 210 478.431 210 495ZM95 444C111.569 444 125 430.569 125 414C125 397.431 111.569 384 95 384C78.4314 384 65 397.431 65 414C65 430.569 78.4314 444 95 444ZM295 414C295 430.569 281.569 444 265 444C248.431 444 235 430.569 235 414C235 397.431 248.431 384 265 384C281.569 384 295 397.431 295 414ZM350 444C366.569 444 380 430.569 380 414C380 397.431 366.569 384 350 384C333.431 384 320 397.431 320 414C320 430.569 333.431 444 350 444ZM465 414C465 430.569 451.569 444 435 444C418.431 444 405 430.569 405 414C405 397.431 418.431 384 435 384C451.569 384 465 397.431 465 414ZM520 444C536.569 444 550 430.569 550 414C550 397.431 536.569 384 520 384C503.431 384 490 397.431 490 414C490 430.569 503.431 444 520 444ZM635 414C635 430.569 621.569 444 605 444C588.431 444 575 430.569 575 414C575 397.431 588.431 384 605 384C621.569 384 635 397.431 635 414ZM180 444C196.569 444 210 430.569 210 414C210 397.431 196.569 384 180 384C163.431 384 150 397.431 150 414C150 430.569 163.431 444 180 444ZM125 333C125 349.569 111.569 363 95 363C78.4314 363 65 349.569 65 333C65 316.431 78.4314 303 95 303C111.569 303 125 316.431 125 333ZM265 363C281.569 363 295 349.569 295 333C295 316.431 281.569 303 265 303C248.431 303 235 316.431 235 333C235 349.569 248.431 363 265 363ZM380 333C380 349.569 366.569 363 350 363C333.431 363 320 349.569 320 333C320 316.431 333.431 303 350 303C366.569 303 380 316.431 380 333ZM435 363C451.569 363 465 349.569 465 333C465 316.431 451.569 303 435 303C418.431 303 405 316.431 405 333C405 349.569 418.431 363 435 363ZM550 333C550 349.569 536.569 363 520 363C503.431 363 490 349.569 490 333C490 316.431 503.431 303 520 303C536.569 303 550 316.431 550 333ZM605 363C621.569 363 635 349.569 635 333C635 316.431 621.569 303 605 303C588.431 303 575 316.431 575 333C575 349.569 588.431 363 605 363ZM210 333C210 349.569 196.569 363 180 363C163.431 363 150 349.569 150 333C150 316.431 163.431 303 180 303C196.569 303 210 316.431 210 333ZM95 282C111.569 282 125 268.569 125 252C125 235.431 111.569 222 95 222C78.4314 222 65 235.431 65 252C65 268.569 78.4314 282 95 282ZM295 252C295 268.569 281.569 282 265 282C248.431 282 235 268.569 235 252C235 235.431 248.431 222 265 222C281.569 222 295 235.431 295 252ZM350 282C366.569 282 380 268.569 380 252C380 235.431 366.569 222 350 222C333.431 222 320 235.431 320 252C320 268.569 333.431 282 350 282ZM465 252C465 268.569 451.569 282 435 282C418.431 282 405 268.569 405 252C405 235.431 418.431 222 435 222C451.569 222 465 235.431 465 252ZM520 282C536.569 282 550 268.569 550 252C550 235.431 536.569 222 520 222C503.431 222 490 235.431 490 252C490 268.569 503.431 282 520 282ZM635 252C635 268.569 621.569 282 605 282C588.431 282 575 268.569 575 252C575 235.431 588.431 222 605 222C621.569 222 635 235.431 635 252ZM180 282C196.569 282 210 268.569 210 252C210 235.431 196.569 222 180 222C163.431 222 150 235.431 150 252C150 268.569 163.431 282 180 282ZM125 170C125 186.569 111.569 200 95 200C78.4314 200 65 186.569 65 170C65 153.431 78.4314 140 95 140C111.569 140 125 153.431 125 170ZM265 200C281.569 200 295 186.569 295 170C295 153.431 281.569 140 265 140C248.431 140 235 153.431 235 170C235 186.569 248.431 200 265 200ZM380 170C380 186.569 366.569 200 350 200C333.431 200 320 186.569 320 170C320 153.431 333.431 140 350 140C366.569 140 380 153.431 380 170ZM435 200C451.569 200 465 186.569 465 170C465 153.431 451.569 140 435 140C418.431 140 405 153.431 405 170C405 186.569 418.431 200 435 200ZM550 170C550 186.569 536.569 200 520 200C503.431 200 490 186.569 490 170C490 153.431 503.431 140 520 140C536.569 140 550 153.431 550 170ZM605 200C621.569 200 635 186.569 635 170C635 153.431 621.569 140 605 140C588.431 140 575 153.431 575 170C575 186.569 588.431 200 605 200ZM210 170C210 186.569 196.569 200 180 200C163.431 200 150 186.569 150 170C150 153.431 163.431 140 180 140C196.569 140 210 153.431 210 170Z"
          fill="#3F3F79"
        />
      </svg>
    </div>
  );
  
}
