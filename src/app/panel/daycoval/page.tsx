"use client";

import { sendCampaignEvent } from "@/lib/colmeia";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

async function sendCampaign(data: ICampaignEventBody) {
  await sendCampaignEvent(data);
}

export default function Page() {
  const [data, setData] = useState({
    nome: "",
    cpf: "01234567890",
    celular: "",
  });

  const [template,setTemplate] = useState<string>("");

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
      contactList: [ data ],
    });
  }

  function handleAction() {
    if( !template ) {
        toast.error(`Você precisa colocar um ID de ação de campanha para fazer um disparo customizado`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        return;
    }

    send({
      idCampaignAction: template,
      contactList: [ data ],
    });
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
        <h2 className="text-base/7 font-semibold text-gray-900">Disparo customizado</h2>
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
      className={`p-4 rounded-xl mb-4 bg-gradient-to-r from-${color}-200 to-${color}-50 flex gap-8 justify-center items-center`}
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
