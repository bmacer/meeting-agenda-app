// src/CurrentTime.tsx
import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const CurrentTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Box>
      <Text as="h3">
        Current Time:{" "}
        {currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
    </Box>
  );
};

export default CurrentTime;
