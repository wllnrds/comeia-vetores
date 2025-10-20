import { NextRequest } from "next/server";

type IConfirmAppointmentRequest = {
  data: {
    subscriberId: string;
    appointmentConfirmation: boolean;
    workOrderId: number;
  };
};

type IConfirmAppointmentResponse = {
  apiVersion: string;
  transactionId: string;
  data: {
    workOrderId: number;
  };
};

// Confirma um agendamento
export async function POST(request: NextRequest) {
  const req: IConfirmAppointmentRequest = await request.json();

  const response: IConfirmAppointmentResponse = {
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
