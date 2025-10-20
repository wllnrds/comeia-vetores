import { NextRequest } from "next/server";

type IAvailableTimeSlotsRequest = {
  addressId: string;
  workOrderId: string;
  startDate: string;
  endDate: string;
  associatedDocumentDate: string;
  promiseDate: string;
  normativeIndicatorDate: string;
  serviceType: string;
};

type IAvailableTimeSlotsResponse = {
  apiVersion: string;
  transactionId: string;
  data: {
    appointmentTimeSlots: {
      startDate: string;
      endDate: string;
    }[];
  };
};

const START_HOUR = 8; // 8 AM
const LAST_HOUR = 18; // 6 PM
const TIME_SPACE = 2; // hour

function generateTimeSlots(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeSlots = [];

  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    for (
      let hour = start.getHours() < START_HOUR ? START_HOUR : start.getHours();
      hour < LAST_HOUR && hour + TIME_SPACE <= LAST_HOUR;
      hour
    ) {
      const slotStart = new Date(day);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(day);
      slotEnd.setHours(hour + TIME_SPACE, 0, 0, 0);

      timeSlots.push({
        startDate: slotStart.toString(),
        endDate: slotEnd.toString(),
      });
      hour += TIME_SPACE;
    }
  }

  return timeSlots;
}

// Retorna os horários disponíveis para agendamento
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const today = new Date();
  today.setHours(today.getHours(), 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59);

  const _startDate = searchParams.get("startDate");
  const _endDate = searchParams.get("endDate");

  const requestData: IAvailableTimeSlotsRequest = {
    addressId: searchParams.get("addressId") || "",
    workOrderId: searchParams.get("workOrderId") || "",
    startDate: castToDate(_startDate || "", today),
    endDate: castToDate(_endDate || "", endOfToday),
    associatedDocumentDate: searchParams.get("associatedDocumentDate") || "",
    promiseDate: searchParams.get("promiseDate") || "",
    normativeIndicatorDate: searchParams.get("normativeIndicatorDate") || "",
    serviceType: searchParams.get("serviceType") || "",
  };

  const MOCK_DATA = {
    apiVersion: "1;2022-02-08",
    transactionId: "593f33f6-6122-4624-8c1c-6602a14a730e",
    data: {
      appointmentTimeSlots: [
        ...generateTimeSlots(requestData.startDate, requestData.endDate),
      ],
    },
  };

  const response: IAvailableTimeSlotsResponse = MOCK_DATA;
  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function castToDate(value: string, defaultValue: Date): string {
  const _date = new Date(value);
  const date = isNaN(_date.getTime()) ? defaultValue : _date;

  return date.toString();
}

// api/mock/claro/vtal/gponappointments/timeslots?startDate=2025-10-17T00:00:59.817Z&endDate=2025-10-17T23:59:59.817Z
