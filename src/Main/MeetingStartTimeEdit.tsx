import React, { useState, useEffect } from "react";
import { FormControl, Input, HStack, Flex } from "@chakra-ui/react";
import { useAgenda } from "../AgendaContext";

type MeetingStartTimeEditProps = {
  setNewMeetingStartDate: (date: Date) => void;
};

const MeetingStartTimeEdit: React.FC<MeetingStartTimeEditProps> = ({
  setNewMeetingStartDate,
}) => {
  const [time, setTime] = useState<string>(""); // Initially empty until set by useEffect
  const { setMeetingIsComplete } = useAgenda();
  useEffect(() => {
    let currentDate = new Date();
    const currentStartTime = new Date(
      new Date().setMinutes(currentDate.getMinutes() + 1)
    );

    const hours = currentStartTime.getHours().toString().padStart(2, "0");
    const minutes = currentStartTime.getMinutes().toString().padStart(2, "0");
    const localTime = `${hours}:${minutes}`;
    setTime(localTime);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
    const [hours, minutes] = event.target.value.split(":").map(Number);
    const currentStartTime = new Date();
    currentStartTime.setHours(hours, minutes, 0);
    setNewMeetingStartDate(currentStartTime);
    setMeetingIsComplete(false);
  };

  return (
    <HStack justifyContent="center">
      <Flex w="16vw">
        <FormControl w="100%" data-focus={true}>
          <Input
            className="editing"
            w="20vw"
            id="meeting-time"
            type="time"
            value={time}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>
    </HStack>
  );
};

export default MeetingStartTimeEdit;
