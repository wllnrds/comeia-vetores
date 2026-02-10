"use client";

import { sendCampaignEvent } from "@/lib/colmeia";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

async function sendCampaign(data: ICampaignEventBody) {
  await sendCampaignEvent(data);
}

export default function Page() {
  const seatchParams = useSearchParams();

  const proposta = {
    nome: seatchParams.get("nome") || undefined,
    cpf: seatchParams.get("cpf") || undefined,
    celular: seatchParams.get("celular") || undefined,
  };

  const [proposalSended, setProposalSended] = useState(false);

  const [data, setData] = useState({
    nome: "Will",
    cpf: "01234567890",
    celular: "5511990119349",
  });

  const [template, setTemplate] = useState<string>("");
  const [mktRuler, setMktRuler] = useState<string>("");

  function send(data: ICampaignEventBody) {
    sendCampaign(data)
      .then(() => {
        toast.success("Campanha enviada com sucesso!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((error) => {
        toast.error(`Algo deu errado no envio da campanha`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        console.error("Error sending campaign:", error);
      });
  }

  function handleActionDefault() {
    send({
      idCampaignAction: "DkB5xLCiCQTMf5KxDVejaUqnDCybQq",
      contactList: [data],
    });
  }

  function handleAction() {
    if (!template && !mktRuler) {
      toast.error(
        `Você precisa colocar um ID de ação de campanha ou um ID de régua de marketing para fazer um disparo customizado`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        },
      );

      return;
    }

    send({
      idCampaignAction: template || undefined,
      idMktRuler: mktRuler || undefined,
      contactList: [data],
    });
  }

  function handleActionProposta() {
    send({
      idMktRuler: "ijBmkmQ1Oke74JjPipdvoS3ntpwEhyIh",
      contactList: [{
        nome: proposta.nome!,
        cpf: proposta.cpf!,
        celular: proposta.celular!,
      }],
    })
    setProposalSended(true);
  }

  if (proposta.nome && proposta.cpf && proposta.celular) {
    if(proposalSended) {

    return (
      <div className="h-dvh flex items-center justify-center text-gray-900">
        <section className="max-w-sm w-full p-4 bg-white flex flex-col rounded-2xl shadow-2xs">
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-xl text-blue-800 font-semibold text-center">
              Proposta aceita com sucesso!
            </h1>
      </div>
        </section>
      </div>
    );
    }

    return (
      <div className="h-dvh flex items-center justify-center text-gray-900">
        <section className="max-w-sm w-full p-4 bg-white flex flex-col rounded-2xl shadow-2xs">
          <div className="p-4 flex flex-col gap-2">
            <h1 className="text-xl text-blue-800 font-semibold">
              Aceite de Proposta
            </h1>
            <p className="font-light">
              Simulação de aceite de proposta no nome de{" "}
              <strong className="font-bold">{proposta.nome}</strong>, com cpf{" "}
              <strong className="font-bold">{proposta.cpf}</strong>.
            </p>
          </div>

          <Action
            title="Confirmar aceite"
            description="Simular o aceite da proposta web"
            action={handleActionProposta}
            color="lime"
          />
        </section>
      </div>
    );
  }

  return (
    <div className="m-auto max-w-7xl p-8 flex flex-col sm:flex-row gap-8">
      <section className="flex flex-col gap-2 flex-1 xl:flex-4">
        <h2 className="text-base/7 font-semibold text-gray-900">
          Informações para disparo
        </h2>
        <p className="text-sm/6 text-gray-600">
          Altere as informações para disparar a campanha.
        </p>
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <label
              htmlFor="nome"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Nome
            </label>
            <div className="mt-1">
              <input
                id="nome"
                type="text"
                value={data.nome}
                name="nome"
                autoComplete="nome"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setData({ ...data, nome: e.target.value })}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="nome"
              className="block text-sm/6 font-medium text-gray-900"
            >
              CPF
            </label>
            <div className="mt-1">
              <input
                id="cpf"
                type="text"
                value={data.cpf}
                name="cpf"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setData({ ...data, cpf: e.target.value })}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="nome"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Celular
            </label>
            <div className="mt-1">
              <input
                id="celular"
                type="tel"
                value={data.celular}
                name="celular"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setData({ ...data, celular: e.target.value })}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col gap-2 flex-1 xl:flex-2">
        <h2 className="text-base/7 font-semibold text-gray-900">Disparo</h2>
        <p className="text-sm/6 text-gray-600">
          Clique no botão para disparar a campanha de teste.
        </p>
        <Action
          title="Disparar oferta"
          description="Envia uma mensagem de oferta disponível."
          action={handleActionDefault}
          color="sky"
        />
        <div className="mt-6 flex gap-4 flex-col px-4 pt-4 border rounded-xl border-gray-200 bg-white">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Disparo customizado
          </h2>
          <div className="w-full">
            <label
              htmlFor="nome"
              className="block text-sm/6 font-medium text-gray-900"
            >
              ID Ação de campanha
            </label>
            <div className="mt-1">
              <input
                id="template"
                type="text"
                value={template || ""}
                name="template"
                autoComplete="template"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setTemplate(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="nome"
              className="block text-sm/6 font-medium text-gray-900"
            >
              ID Régua de marketing (opcional)
            </label>
            <div className="mt-1">
              <input
                id="mktRuler"
                type="text"
                value={mktRuler || ""}
                name="mktRuler"
                autoComplete="mktRuler"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                onChange={(e) => setMktRuler(e.target.value)}
              />
            </div>
          </div>
          <Action
            title="Disparar template"
            description="Envia uma mensagem de oferta disponível."
            action={handleAction}
            color="lime"
          />
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="hidden">
        preload tailwind colorProgress
        <div className="bg-sky-200 bg-lime-200 bg-rose-200 bg-violet-200"></div>
        <div className="bg-sky-500 bg-lime-500 bg-rose-500 bg-violet-500"></div>
        <div className="from-sky-200 via-sky-300 to-sky-50 from-lime-200 via-lime-300 to-lime-50 from-rose-200 via-rose-300 to-rose-50 from-violet-200 via-violet-300 to-violet-50"></div>
        <div className="bg-sky-600 hover:bg-sky-500 bg-lime-600 hover:bg-lime-500 bg-rose-600 hover:bg-rose-500 bg-violet-600 hover:bg-violet-500"></div>
      </div>
    </div>
  );
}

function Action({
  title,
  description,
  action,
  color,
}: {
  title: string;
  description: string;
  action: Function;
  color?: "sky" | "lime" | "rose" | "violet";
}) {
  return (
    <section
      className={`p-4 rounded-xl bg-gradient-to-r from-${color}-200 to-${color}-50 flex gap-8 justify-center items-center`}
    >
      <div className="flex-1">
        <h5 className="text-base font-bold">{title}</h5>
        <p className=" text-xs text-zinc-600">{description}</p>
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => action()}
          className={`bg-${color}-600 text-sm font-semibold text-white hover:bg-${color}-500 outline-nonew-12 h-12 flex justify-center items-center rounded-full cursor-pointer aspect-square`}
        >
          <span className="material-symbols-rounded">send</span>
        </button>
      </div>
    </section>
  );
}
