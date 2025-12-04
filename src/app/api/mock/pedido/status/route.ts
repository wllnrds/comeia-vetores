import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  const orderStatus = orders.find((order) => order.orderId === id);

  if (!orderStatus) {
    return new Response(toTxt({ error: "Order not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const result = {
    data: {
      order: orderStatus,
    },
  };

  return new Response(toTxt(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function toTxt(data: any) {
  return JSON.stringify(data, null, 2);
}

const customer = {
  id: "CUST1001",
  name: "João Silva",
  email: "joao.silva@email.com",
  address: {
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 101",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
  },
  phone: "+55 11 91234-5678",
};

function getDatePlus(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

const orders = [
  {
    orderId: "ORD100001",
    status: "Processing",
    estimatedDelivery: getDatePlus(14),
    deliveryAddress: {
      ...customer.address,
    },
    items: [
      {
        itemId: "GLP13",
        productName: "Gás GLP 13kg",
        quantity: 2,
        pricePerUnit: 80.0,
        totalPrice: 160.0,
      },
    ],
  },
  {
    orderId: "ORD100002",
    status: "Delivered",
    estimatedDelivery: getDatePlus(-5),
    deliveryAddress: {
      ...customer.address,
    },
    items: [
      {
        itemId: "GLP13",
        productName: "Gás GLP 13kg",
        quantity: 1,
        pricePerUnit: 80.0,
        totalPrice: 80.0,
      },
    ],
  },
  {
    orderId: "ORD100003",
    status: "Shipped",
    estimatedDelivery: getDatePlus(0),
    deliveryAddress: {
      ...customer.address,
    },
    items: [
      {
        itemId: "GLP13",
        productName: "Gás GLP 13kg",
        quantity: 3,
        pricePerUnit: 80.0,
        totalPrice: 240.0,
      },
    ],
  },
];

// print data as "segunda-feira, 01 de janeiro de 2024"
function dateToStamp(dateStr: string): string {
  const date = new Date(dateStr);

  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function writeAddress(address: any): string {
  return `${address.street}, ${address.number}${
    address.complement ? ", " + address.complement : ""
  } - ${address.neighborhood}, ${address.city} - ${address.state}, ${
    address.zipCode
  }`;
}

const STATUS: Record<string, string> = {
  Processing: "Processando",
  Delivered: "Entregue",
  Shipped: "Em rota de entrega",
};
