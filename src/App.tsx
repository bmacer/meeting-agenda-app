import { useEffect, useState } from "react";
import "./App.css";
import { Box, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import CurrentTime from "./Main/CurrentTime";
import MeetingStartTimeEdit from "./Main/MeetingStartTimeEdit";
import MeetingTimer from "./Main/MeetingTimer.component";
import CurrentItem from "./Main/CurrentItem.component";
import { useAgenda } from "./AgendaContext";
import AgendaItemList from "./Sidebar/AgendaItemList.component";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { secondsUnderway, meetingIsComplete, agendaItems, setAgendaItems } =
    useAgenda();
  const [meetingStartDate, setMeetingStartDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 1);
    return currentDate;
  });

  const fetchAndSetFromLocalStorage = () => {
    let storedItems = localStorage.getItem("agenda-items");
    if (storedItems) {
      console.log("stored items!");
      setAgendaItems(JSON.parse(storedItems));
    }
    setIsLoaded(true);
  };

  useEffect(() => {
    fetchAndSetFromLocalStorage();
  }, []);

  const saveToStorage = () => {
    localStorage.setItem("agenda-items", JSON.stringify(agendaItems));
  };
  useEffect(() => {
    saveToStorage();
  }, [agendaItems]);
  return (
    <Box className="App" w="100vw" h="100vh">
      <HStack w="100%" h="100%">
        <Flex w="65%" h="100%" justifyContent="center">
          <Flex w="100%" h="100%">
            <VStack w="100%" h="100%">
              <Flex h="90%" w="100%" justifyContent="center">
                <HStack>
                  <Spacer />
                  {meetingIsComplete ? (
                    <Text as="h3">Meeting is complete!</Text>
                  ) : (
                    <>
                      <MeetingTimer meetingStartDate={meetingStartDate} />
                    </>
                  )}
                  <Spacer />
                </HStack>
              </Flex>
              <Flex h="10%" w="100%" justifyContent="center">
                <HStack>
                  <Text as="h3" pr="10px">
                    Meeting Start Time:
                  </Text>
                  <MeetingStartTimeEdit
                    setNewMeetingStartDate={setMeetingStartDate}
                  />
                </HStack>
              </Flex>
            </VStack>
          </Flex>
        </Flex>
        <Flex w="35%" h="100%" bgColor="#95D8EB">
          {isLoaded && <AgendaItemList />}
        </Flex>
      </HStack>
    </Box>
  );
}

export default App;
