export async function GET() {
  const data = {
    simulationId: "sim_8f3a2c91",
    requestedAt: "2026-02-03T13:58:00-03:00",
    customer: {
      id: "cust_102938",
      profile: "PF",
    },
    loan: {
      amountRequested: 15000.0,
      termInMonths: 24,
      interestRate: {
        monthly: 0.029,
        annual: 0.412,
      },
      installmentType: "PRICE",
    },
    result: {
      approved: true,
      monthlyInstallment: 824.37,
      totalAmountPayable: 19784.88,
      totalInterest: 4784.88,
      cet: {
        monthly: 0.031,
        annual: 0.445,
      },
    },
    fees: {
      originationFee: 300.0,
      insurance: 120.0,
      includedInCET: true,
    },
    meta: {
      currency: "BRL",
      simulationVersion: "v1",
      disclaimer: "Valores estimados, sujeitos à aprovação de crédito.",
    },
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
