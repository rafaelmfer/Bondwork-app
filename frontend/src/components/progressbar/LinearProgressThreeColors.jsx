import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

function LinearProgressThreeColors({
    segments,
    statusColor1,
    statusColor2,
    statusColor3,
    height,
    borderRadius,
    animationDuration,
}) {
    const [currentSegment, setCurrentSegment] = useState(0);
    const [filledPercent, setFilledPercent] = useState([0, 0, 0]);

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
    const numSpaces = segments.filter((seg) => seg !== 0).length - 1;
    const segmentWidth = (totalWidth - numSpaces * spaceWidth) / totalSegments;

    const adjustedSegments = segments.map((segment, index) => ({
        width: segment === 0 ? 0 : segment * segmentWidth,
        color: [statusColor1, statusColor2, statusColor3][index],
    }));

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
                    backgroundColor: adjustedSegments[0].color,
                    width: `${(filledPercent[0] / segments[0]) * adjustedSegments[0].width}%`,
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
                    backgroundColor: adjustedSegments[1].color,
                    width: `${(filledPercent[1] / segments[1]) * adjustedSegments[1].width}%`,
                    height: "100%",
                    transition: `width ${animationDuration / segments[1]}ms linear`,
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
                    backgroundColor: adjustedSegments[2].color,
                    width: `${(filledPercent[2] / segments[2]) * adjustedSegments[2].width}%`,
                    height: "100%",
                    transition: `width ${animationDuration / segments[2]}ms linear`,
                }}
            />
        </Box>
    );
}

export default LinearProgressThreeColors;
