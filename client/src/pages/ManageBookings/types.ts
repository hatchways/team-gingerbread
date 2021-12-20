export enum BookingStatus {
  pending,
  accepted,
  declined,
}

export type BookingRequest = {
  description: string;
  status: BookingStatus;
  requestId: string;
  userId: string;
  sitterId: string;
  start: Date;
  end: Date;
};

export type BookingRequests = BookingRequest[];
