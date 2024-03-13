// src/AgendaItem.ts
export type AgendaItem = {
    id: string;
    description: string;
    duration: number; // duration in seconds
    startTime?: Date;
};
