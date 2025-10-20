import type { NextApiRequest } from "next";

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

// Altera um agendamento
export async function PATCH(request: NextRequest) {
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

// Retorna um agendamento baseado na rota .../:orderId
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;

  if (!orderId) {
    return new Response("Order ID is required", { status: 400 });
  }

  const dateStart = new Date();
  dateStart.setDate(dateStart.getDate() + 7);
  dateStart.setHours(15, 0, 0, 0);

  const dateEnd = new Date();
  dateEnd.setDate(dateStart.getDate());
  dateEnd.setHours(dateStart.getHours() + 2, 0, 0, 0);

  const response: any = {
    transactionId: "593f33f6-6122-4624-8c1c-6602a14a730e",
    data: {
      associatedDocument: "12345678900",
      associatedDocumentDate: new Date().toString(),
      serviceType: 1,
      startDate: dateStart.toString(),
      endDate: dateEnd.toString(),
      normativeIndicatorDate: new Date().toString(),
      promiseDate: new Date().toString(),
      note: "Agendado instação",
      reason: "",
      addressId: 1,
    },
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
