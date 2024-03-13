import { DraggableProvided } from "react-beautiful-dnd";
import { useAgenda } from "../AgendaContext";
import { AgendaItem } from "../AgendaItem";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";

const DurationForItem = ({ item }: { item: AgendaItem }) => {
  const minutes = Math.floor(item.duration / 60);
  const seconds = item.duration % 60;

  return (
    <VStack w="100%">
      <Text as="h4" w="100%">
        {minutes === 1 && <>{minutes} min</>}
        {minutes > 1 && <>{minutes} mins</>}
        {minutes > 0 && seconds > 0 && ", "}
        {seconds > 0 && <>{seconds} sec</>}
      </Text>
      <Text as="h3" w="100%">
        {item.description}
      </Text>
    </VStack>
  );
};

const AgendaItemIndividual = ({
  provided,
  item,
}: {
  provided?: DraggableProvided;
  item?: AgendaItem;
}) => {
  const {
    agendaItems,
    setAgendaItems,
    secondsUnderway,
    currentAgendaItem,
    setMeetingIsComplete,
  } = useAgenda();

  const handleAddMinute = (id: string) => {
    const newItems = agendaItems.map((item) => {
      if (item.id !== id) return item;
      return { ...item, duration: item.duration + 30 };
    });
    setAgendaItems(newItems);
    setMeetingIsComplete(false);
  };

  const handleDelete = (id: string) => {
    const newItems = agendaItems.filter((item) => item.id !== id);
    setAgendaItems(newItems);
  };

  const handleCompleteAgendaItem = (id: string) => {
    let indexOfCurrentItem = 0;
    agendaItems.forEach((item, index) => {
      if (item.id !== id) return;
      indexOfCurrentItem = index;
    });
    let durationOfPreviousItems = 0;
    agendaItems.forEach((item, index) => {
      if (index < indexOfCurrentItem) {
        durationOfPreviousItems += item.duration;
      }
    });
    let newItemDuration = secondsUnderway - durationOfPreviousItems;
    const newItems = agendaItems.map((item) => {
      if (item.id !== id) return item;
      return { ...item, duration: newItemDuration };
    });
    setAgendaItems(newItems);
  };
  if (!item) return <></>;
  return (
    <Box
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
      bgColor={currentAgendaItem === item ? "#48BF91" : "#0076BE"}
      style={{
        userSelect: "none",
        padding: 16,
        margin: "0 0 8px 0",
        minHeight: "50px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        ...provided?.draggableProps.style,
      }}
    >
      <DurationForItem item={item} />

      <VStack>
        <Flex
          fontSize="10px"
          style={{ cursor: "pointer" }}
          onClick={() => handleAddMinute(item.id)}
        >
          +30s
        </Flex>
        <Flex
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(item.id)}
        >
          🗑️
        </Flex>
        <Flex
          style={{ cursor: "pointer" }}
          onClick={() => handleCompleteAgendaItem(item.id)}
        >
          {item === currentAgendaItem ? "✔️" : ""}
        </Flex>
      </VStack>
    </Box>
  );
};

export default AgendaItemIndividual;
