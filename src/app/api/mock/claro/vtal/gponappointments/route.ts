import { NextRequest } from "next/server";

type IScheduleAppointmentRequest = {
  data: {
    associatedDocument: string;
    associatedDocumentDate: string;
    serviceType: number;
    startDate: string;
    endDate: string;
    normativeIndicatorDate: string;
    promiseDate: string;
    note: string;
    reason: string;
    addressId: number;
  };
};

type IScheduleAppointmentResponse = {
  apiVersion: string;
  transactionId: string;
  data: {
    workOrderId: number;
  };
};

// Cria um agendamento
export async function POST(request: NextRequest) {
  const req: IScheduleAppointmentRequest = await request.json();

  const response: IScheduleAppointmentResponse = {
    apiVersion: "1;2022-02-08",
    transactionId: "593f33f6-6122-4624-8c1c-6602a14a730e",
    data: {
      workOrderId: 146755584504157,
    },
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
