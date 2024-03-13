// src/AgendaContext.tsx
import React, { createContext, useContext, useState } from "react";
import { AgendaItem } from "./AgendaItem";

type AgendaContextType = {
  agendaItems: AgendaItem[];
  setAgendaItems: React.Dispatch<React.SetStateAction<AgendaItem[]>>;
  currentAgendaItem?: AgendaItem;
  setCurrentAgendaItem: React.Dispatch<
    React.SetStateAction<AgendaItem | undefined>
  >;
  secondsUnderway: number;
  setSecondsUnderway: React.Dispatch<React.SetStateAction<number>>;
  meetingTimeRemaining: number;
  setMeetingTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  currentItemRemainingTime: number;
  setCurrentItemRemainingTime: React.Dispatch<React.SetStateAction<number>>;
  meetingIsComplete: boolean;
  setMeetingIsComplete: React.Dispatch<React.SetStateAction<boolean>>;
};

const AgendaContext = createContext<AgendaContextType | undefined>(undefined);

export const useAgenda = () => {
  const context = useContext(AgendaContext);
  if (!context) {
    throw new Error("useAgenda must be used within a AgendaProvider");
  }
  return context;
};

export const AgendaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [currentAgendaItem, setCurrentAgendaItem] = useState<AgendaItem>();
  const [secondsUnderway, setSecondsUnderway] = useState<number>(-1);
  const [meetingTimeRemaining, setMeetingTimeRemaining] = useState<number>(-1);
  const [currentItemRemainingTime, setCurrentItemRemainingTime] =
    useState<number>(-1);
  const [meetingIsComplete, setMeetingIsComplete] = useState<boolean>(false);

  return (
    <AgendaContext.Provider
      value={{
        agendaItems,
        setAgendaItems,
        currentAgendaItem,
        setCurrentAgendaItem,
        secondsUnderway,
        setSecondsUnderway,
        meetingTimeRemaining,
        setMeetingTimeRemaining,
        currentItemRemainingTime,
        setCurrentItemRemainingTime,
        meetingIsComplete,
        setMeetingIsComplete,
      }}
    >
      {children}
    </AgendaContext.Provider>
  );
};
