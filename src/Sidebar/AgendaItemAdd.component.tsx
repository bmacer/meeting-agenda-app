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
    <Box
      h="200px"
      w="30vw"
      bgColor="grey"
      //   style={{
      //     background: "orange",
      //     padding: 8,
      //     width: 250,
      //     minHeight: 500,
      //   }}
    >
      <Box
        as="form"
        onSubmit={handleSubmit}
        style={{
          userSelect: "none",
          padding: 16,
          margin: "0 0 8px 0",
          minHeight: "50px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HStack justifyContent="center">
          <FormControl isRequired>
            <Textarea
              required={true}
              autoComplete="off"
              id="description"
              placeholder="Add agenda item..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              h="120px"
              w="100%"
              fontSize="25px"
              overflowWrap="normal"
            />
          </FormControl>
          <VStack h="100%">
            <Text>Mins</Text>
            <Flex w="50px" h="30px" bgColor="blue">
              <FormControl w="100%" isRequired>
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
            <Button
              h="50px"
              w="100%"
              colorScheme="blue"
              aria-label="Add Item"
              onClick={handleSubmit}
            >
              +
            </Button>
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default AddItemForm;
