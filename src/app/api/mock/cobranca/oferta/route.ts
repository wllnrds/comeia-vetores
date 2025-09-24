export async function GET() {
  const data = {
    data: {
      cliente: {
        nome: "João da Silva",
        cpf: "123.456.789-00",
      },
      ofertas: [
        {
          numeroContrato: "123456789",
          descricao: "Empréstimo Pessoal",
          valor: 5000,
          ofertas: [
            {
              id: "oferta1",
              valorTotal: 5000,
              valorParcela: 500,
              desconto: 0,
              quantidadeParcelas: 1,
              quantidadeParcelasTotal: 10,
              taxaJurosMes: 0.01,
              taxaJurosAno: 0.12,
              iof: 0,
            },
            {
              id: "oferta2",
              valorTotal: 4500,
              valorParcela: 4500,
              desconto: 500,
              quantidadeParcelas: 1,
              quantidadeParcelasTotal: 1,
              taxaJurosMes: 0.0,
              taxaJurosAno: 0.0,
              iof: 0,
            },
          ],
        },
      ],
      contratos: [
        {
          numeroContrato: "123456712",
          descricao: "Cartão de Crédito",
          valor: 4000,
          parcelasPagas: 0,
          parcelasTotais: 1,
          valorParcela: 4000,
          saldoDevedor: 4000,
          dataVencimento: "2024-11-31",
          diasAtraso: 0,
          juros: 0.02,
        },
        {
          numeroContrato: "123456789",
          descricao: "Empréstimo Pessoal",
          valor: 10000,
          parcelasPagas: 5,
          parcelasTotais: 10,
          valorParcela: 1000,
          saldoDevedor: 5000,
          dataVencimento: "2024-09-31",
          diasAtraso: 10,
          juros: 0.02,
        },
      ],
    },
  };

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
