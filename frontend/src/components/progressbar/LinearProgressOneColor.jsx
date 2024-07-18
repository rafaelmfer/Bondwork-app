import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";

const LinearProgressOneColor = ({ startAnimation, statusColor1 }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (startAnimation) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return Math.min(oldProgress + 1, 100);
                });
            }, 10);

            return () => {
                clearInterval(timer);
            };
        } else {
            setProgress(0);
        }
    }, [startAnimation]);

    return (
        <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
                flexGrow: 1,
                height: 10,
                borderRadius: "5px",
                backgroundColor: "transparent",
                "& .MuiLinearProgress-bar": {
                    backgroundColor: statusColor1,
                },
            }}
        />
    );
};

export default LinearProgressOneColor;
