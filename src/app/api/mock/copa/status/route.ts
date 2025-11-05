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

const orders = [
  {
    orderId: "ORD100001",
    status: "Processing",
    estimatedDelivery: "2025-11-15",
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
    estimatedDelivery: "2025-10-20",
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
    status: "Processing",
    estimatedDelivery: "2025-12-05",
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
