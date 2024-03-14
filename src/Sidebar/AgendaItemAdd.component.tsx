// src/AddItemForm.tsx
import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  HStack,
  Textarea,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  IconButton,
  VStack,
  Flex,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { useAgenda } from "../AgendaContext"; // Ensure this is the correct path to your context
import { v4 as uuidv4 } from "uuid"; // Ensure you have uuid installed to generate unique ids

const AddItemForm: React.FC = () => {
  const { agendaItems, setAgendaItems, setMeetingIsComplete } = useAgenda();
  const [description, setDescription] = useState("");
  const [minutes, setMinutes] = useState("1");
  const [seconds, setSeconds] = useState("");

  const handleMinutesChange = (
    valueAsString: string,
    valueAsNumber: number
  ) => {
    if (!isNaN(valueAsNumber)) {
      if (valueAsNumber > 0) {
        setMinutes(valueAsString);
      }
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    if (description === "") return;
    event.preventDefault();

    // Convert minutes and seconds to total seconds
    const durationInSeconds = (parseInt(minutes, 10) || 0) * 60;

    // Create a new agenda item
    const newItem = {
      id: uuidv4(), // Generate a unique id for the item
      description: description,
      duration: durationInSeconds,
      startTime: new Date(), // Placeholder, you should calculate the correct start time
    };

    // Add the new item to the agenda items array
    setAgendaItems([...agendaItems, newItem]);

    // Optionally, recalculate the start times for all items

    // Reset the form fields
    setDescription("");
    setMinutes("1");
    setSeconds("");
    setMeetingIsComplete(false);
  };

  return (
    <Flex h="100%" w="100%" bgColor="grey">
      <Flex
        h="100%"
        w="100%"
        as="form"
        onSubmit={handleSubmit}
        style={{
          userSelect: "none",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HStack justifyContent="center" h="100%" w="100%">
          <Flex h="90%" w="80%" p="3%">
            <FormControl isRequired h="100%">
              <Textarea
                required={true}
                autoComplete="off"
                id="description"
                placeholder="Add agenda item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                h="100%"
                w="95%"
                fontSize="25px"
                overflowWrap="normal"
              />
            </FormControl>
          </Flex>
          <Flex h="90%" w="20%">
            <VStack h="100%" w="100%">
              <Flex h="20%" w="100%">
                <Text>Mins</Text>
              </Flex>
              <Flex w="100%" h="20%">
                <FormControl w="80%" isRequired>
                  <NumberInput
                    h="100%"
                    w="100%"
                    value={minutes}
                    onChange={handleMinutesChange}
                  >
                    <NumberInputField
                      h="100%"
                      w="100%"
                      placeholder="⏰"
                      id="minutes"
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper color="blue" />
                      <NumberDecrementStepper color="blue" />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>
              <Spacer />
              <Flex h="40%" w="100%">
                <Button
                  h="30px"
                  w="30px"
                  colorScheme="blue"
                  aria-label="Add Item"
                  onClick={handleSubmit}
                >
                  +
                </Button>
              </Flex>
            </VStack>
          </Flex>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default AddItemForm;
