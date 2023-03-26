export interface BookRide {
    startPoint:string;
    endPoint:string;
    date:string;
    isActive:boolean;
    timeSlot:string;
    bookerUserId?:number;
    offererUserId?:number;
    offererName?:string;
    fare?:number
}
