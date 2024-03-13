import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useAgenda } from "../AgendaContext";
import { Box, Flex, Text } from "@chakra-ui/react";
import AddItemForm from "./AgendaItemAdd.component";
import AgendaItemIndividual from "./AgendaItemIndividual.component";

const AgendaItemList = () => {
  const {
    agendaItems,
    setAgendaItems,
    secondsUnderway,
    setCurrentAgendaItem,
    setCurrentItemRemainingTime,
    setMeetingIsComplete,
    setMeetingTimeRemaining,
  } = useAgenda();

  useEffect(() => {
    if (secondsUnderway <= 0) {
      setCurrentAgendaItem(undefined);
    }
    let scheduledDuration = agendaItems
      .map((i) => i.duration)
      .reduce((prev, cur) => prev + cur, 0);
    console.log("scheduled duration", scheduledDuration);
    console.log("scheduled duration", secondsUnderway);
    setMeetingTimeRemaining(scheduledDuration - secondsUnderway);
    if (scheduledDuration > 30 && secondsUnderway > scheduledDuration) {
      console.log("yes");
      setMeetingIsComplete(true);
    }
    if (agendaItems.length > 0 && secondsUnderway > 0) {
      let totalDuration = 0;
      let foundCurrent = false;
      agendaItems.forEach((item) => {
        if (foundCurrent) return;
        if (totalDuration + item.duration > secondsUnderway) {
          setCurrentAgendaItem(item);
          let currentItemRemaining =
            totalDuration + item.duration - secondsUnderway;
          setCurrentItemRemainingTime(currentItemRemaining);
          foundCurrent = true;
          return;
        } else {
          totalDuration += item.duration;
        }
      });
      if (!foundCurrent) {
        setCurrentAgendaItem(undefined);
      }
    }
  }, [secondsUnderway]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newItems = Array.from(agendaItems);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setAgendaItems(newItems);
  };

  return (
    <Flex overflowY="scroll" h="100%" w="100%" justifyContent="right">
      <Flex w="90%" h="100%" justifyContent="center" pr="5%">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box
                w="100%"
                h="100%"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  padding: 8,
                }}
              >
                <Flex justifyContent="center" w="100%">
                  <Text as="h3" p="20px">
                    Agenda
                  </Text>
                </Flex>
                {agendaItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <AgendaItemIndividual provided={provided} item={item} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <AddItemForm />
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Flex>
    </Flex>
  );
};

export default AgendaItemList;
