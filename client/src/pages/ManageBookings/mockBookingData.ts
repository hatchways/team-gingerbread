import { BookingStatus } from './types';

const mockBookingData = [
  {
    description: 'Test Booking Request Description #1',
    status: BookingStatus.pending,
    requestId: '61a26c5dc517da0ca7a2b9',
    userId: '619c203917b5e66160b119fb',
    sitterId: '618ff3d3939f8555dc391646',
    start: new Date(2021, 10, 9),
    end: new Date(2021, 10, 11),
  },
  {
    description: 'Test Booking Request Description #3',
    status: BookingStatus.declined,
    requestId: '61a26c5dc517da480ca7a2sdf9',
    userId: '619c203917b5e66160b119fb',
    sitterId: '618ff3d3939f8555dc391646',
    start: new Date(2021, 10, 10),
    end: new Date(2021, 10, 15),
  },
  {
    description: 'Test Booking Request Description #4',
    status: BookingStatus.accepted,
    requestId: '61a26cc517da480ca7a2sdf9',
    userId: '619c203917b5e66160b119fb',
    sitterId: '618ff3d3939f8555dc391646',
    start: new Date(2021, 10, 29),
    end: new Date(2021, 10, 29),
  },
  {
    description: 'Test Booking Request Description #5',
    status: BookingStatus.declined,
    requestId: '61a5dc517da480ca7a2sdf9',
    userId: '619c203917b5e66160b119fb',
    sitterId: '618ff3d3939f8555dc391646',
    start: new Date(2021, 11, 5),
    end: new Date(2021, 11, 6),
  },
  {
    description: 'Test Booking Request Description #5',
    status: BookingStatus.declined,
    requestId: '61a5dc517da480ca7a2sdf9',
    userId: '619c203917b5e66160b119fb',
    sitterId: '618ff3d3939f8555dc391646',
    start: new Date(2021, 11, 15),
    end: new Date(2021, 11, 20),
  },
];

export default mockBookingData;
