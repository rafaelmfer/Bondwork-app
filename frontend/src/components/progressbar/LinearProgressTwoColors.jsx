import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

function LinearProgressTwoColors({
    segments,
    color1,
    color2,
    height,
    borderRadius,
    animationDuration,
}) {
    const [currentSegment, setCurrentSegment] = useState(0);
    const [filledPercent, setFilledPercent] = useState([0, 0]);

    useEffect(() => {
        if (currentSegment < segments.length) {
            const timeout = setTimeout(() => {
                const newFilledPercent = [...filledPercent];
                newFilledPercent[currentSegment] += 1;
                setFilledPercent(newFilledPercent);
                if (
                    newFilledPercent[currentSegment] >= segments[currentSegment]
                ) {
                    setCurrentSegment(currentSegment + 1);
                }
            }, animationDuration / segments[currentSegment]);
            return () => clearTimeout(timeout);
        }
    }, [filledPercent, currentSegment, segments, animationDuration]);

    const totalSegments = segments.reduce((acc, segment) => acc + segment, 0);
    // White space
    const spaceWidth = 1.5;
    const totalWidth = 100;
    const adjustedSegments = segments.map(
        (segment) => (segment / totalSegments) * (totalWidth - spaceWidth)
    );

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: "transparent",
                height,
                borderRadius,
                display: "flex",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    backgroundColor: color1,
                    width: `${(filledPercent[0] / segments[0]) * adjustedSegments[0]}%`,
                    height: "100%",
                    transition: `width ${animationDuration / segments[0]}ms linear`,
                }}
            />
            <Box
                sx={{
                    width: `${spaceWidth}%`,
                    height: "100%",
                    backgroundColor: "transparent",
                }}
            />
            <Box
                sx={{
                    backgroundColor: color2,
                    width: `${(filledPercent[1] / segments[1]) * adjustedSegments[1]}%`,
                    height: "100%",
                    transition: `width ${animationDuration / segments[1]}ms linear`,
                }}
            />
        </Box>
    );
}

export default LinearProgressTwoColors;
