export interface IEvents {
    id: number;
    title: string;
    startDay: Date;
    startHour: string;
    endDay?: Date;
    endHour: string;
    local: string;
    description: string;
    isActive: boolean;
}