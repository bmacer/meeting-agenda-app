import { useEffect, useState } from "react";
import { useAgenda } from "../AgendaContext";
import { Flex, Spacer, Text, VStack } from "@chakra-ui/react";

const CurrentItem = () => {
  const { currentItemRemainingTime } = useAgenda();

  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (currentItemRemainingTime < 2) {
      setDisplay("");
      return;
    }
    let minutes = Math.floor(currentItemRemainingTime / 60)
      .toString()
      .padStart(2, "0");
    let seconds = (currentItemRemainingTime % 60).toString().padStart(2, "0");
    setDisplay(`${minutes}:${seconds}`);
  }, [currentItemRemainingTime]);

  return (
    <VStack h="100%">
      <Spacer />
      <Flex>
        <Text as="h3" fontSize="20px">
          Current Item Time Remaining:
        </Text>
      </Flex>
      <Flex>
        <Text as="h3" fontSize="150px">
          {display}
        </Text>
      </Flex>
      <Spacer />
    </VStack>
  );
};

export default CurrentItem;
