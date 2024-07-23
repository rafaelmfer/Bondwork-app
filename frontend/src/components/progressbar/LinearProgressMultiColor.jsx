import React from "react";
import { Box } from "@mui/material";
import LinearProgressOneColor from "./LinearProgressOneColor";
import LinearProgressTwoColors from "./LinearProgressTwoColors";
import LinearProgressThreeColors from "./LinearProgressThreeColors";

const LinearProgressMultiColor = ({
    progressValue1,
    progressValue2,
    progressValue3,
    statusColor1,
    statusColor2,
    statusColor3,
    sx,
}) => {
    // Determine how many progress values are non-zero
    const progressValues = [
        { value: progressValue1, color: statusColor1 },
        { value: progressValue2, color: statusColor2 },
        { value: progressValue3, color: statusColor3 },
    ].filter((pv) => pv.value !== 0);

    return (
        <Box display="flex" sx={sx}>
            {progressValues.length === 3 ? (
                <LinearProgressThreeColors
                    segments={progressValues.map((pv) => pv.value)}
                    statusColor1={progressValues[0].color}
                    statusColor2={progressValues[1].color}
                    statusColor3={progressValues[2].color}
                    height={10}
                    borderRadius={5}
                    animationDuration={300}
                />
            ) : progressValues.length === 2 ? (
                <LinearProgressTwoColors
                    segments={progressValues.map((pv) => pv.value)}
                    color1={progressValues[0].color}
                    color2={progressValues[1].color}
                    height={10}
                    borderRadius={5}
                    animationDuration={300}
                />
            ) : progressValues.length === 1 ? (
                <LinearProgressOneColor
                    startAnimation={true}
                    statusColor1={progressValues[0].color}
                />
            ) : null}
        </Box>
    );
};

export default LinearProgressMultiColor;
