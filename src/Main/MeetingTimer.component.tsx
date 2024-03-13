import { useEffect, useState } from "react";
import { useAgenda } from "../AgendaContext";
import { Box, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import CurrentTime from "./CurrentTime";
import CurrentItem from "./CurrentItem.component";
import AgendaItemIndividual from "../Sidebar/AgendaItemIndividual.component";

const MeetingTimer = ({ meetingStartDate }: { meetingStartDate: Date }) => {
  const [timeUntilMeeting, setTimeUntilMeeting] = useState<string>("");
  const [timeElapsed, setTimeElapsed] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const {
    secondsUnderway,
    setSecondsUnderway,
    meetingTimeRemaining,
    currentAgendaItem,
  } = useAgenda();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const timeDifference = Math.max(
        0,
        meetingStartDate.getTime() - currentTime.getTime()
      );
      const minutesUntil = Math.floor(timeDifference / (1000 * 60));
      const secondsUntil = Math.floor((timeDifference / 1000) % 60);
      setTimeUntilMeeting(
        `${minutesUntil.toString().padStart(2, "0")}:${secondsUntil
          .toString()
          .padStart(2, "0")}`
      );

      const elapsedMilliseconds = Math.max(
        0,
        currentTime.getTime() - meetingStartDate.getTime()
      );
      const minutesElapsed = Math.floor(elapsedMilliseconds / (1000 * 60));
      const secondsElapsed = Math.floor((elapsedMilliseconds / 1000) % 60);
      setSecondsUnderway(minutesElapsed * 60 + secondsElapsed);
      setTimeElapsed(
        `${
          minutesElapsed > 0
            ? `${minutesElapsed} min`
            : `${secondsElapsed} seconds`
        }`
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [meetingStartDate]);

  useEffect(() => {
    const minutesElapsed = Math.floor(meetingTimeRemaining / 60);
    const secondsElapsed = Math.floor(meetingTimeRemaining % 60);
    setTimeRemaining(
      `${
        minutesElapsed > 0
          ? `${minutesElapsed} min`
          : `${secondsElapsed} seconds`
      }`
    );
  }, [meetingTimeRemaining]);

  return (
    <Flex w="100%" h="100%" justifyContent="center">
      {secondsUnderway < 1 ? (
        <>
          <VStack w="100%">
            {true && (
              <Box
                w="100px"
                h="100px"
                bgColor="red"
                position="absolute"
                zIndex={3}
              />
            )}
            <Spacer />

            <Flex>
              <Text as="h3" fontSize="20px" textAlign="center">
                Time Until Meeting Starts:
              </Text>
            </Flex>
            <Flex>
              <Text as="h3" fontSize="150px">
                {timeUntilMeeting}
              </Text>
            </Flex>
            <Spacer />
          </VStack>
        </>
      ) : (
        <VStack w="100%" h="100%">
          <Flex h="75%">
            {secondsUnderway > 0 && (
              <>
                <VStack>
                  <Spacer />
                  <Flex w="50vw" pt="30px" justifyContent="center">
                    <AgendaItemIndividual item={currentAgendaItem} />
                  </Flex>
                  <CurrentItem />
                </VStack>
              </>
            )}
          </Flex>
          <Flex h="20%">
            <VStack h="100%">
              <Flex>
                <CurrentTime />
              </Flex>
              <Flex>
                <Text as="h3">{`Meeting Time Elapsed: ${timeElapsed}`}</Text>
              </Flex>
              <Flex>
                <Text as="h3">{`Meeting Time Remaining: ${timeRemaining}`}</Text>
              </Flex>
            </VStack>
          </Flex>
        </VStack>
      )}
    </Flex>
  );
};

export default MeetingTimer;
