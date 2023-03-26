export interface OfferedRide {
    rideId:number;
    startPoint:string;
    endPoint:string;
    date:string;
    isActive:boolean;
    timeSlot:string;
    intermediatePoints:string
    capacity:string;
    farePerBlock:number;
    offererName:string;
    offererId:number;
}
