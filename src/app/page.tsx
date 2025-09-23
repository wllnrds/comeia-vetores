"use client";

import Image from "next/image";
import Link from "next/link";

type IGroup = {
  name: string;
  type?: "grid" | "default";
  items: {
    title: string;
    href: string;
    cover?: string;
  }[];
};

const data: IGroup[] = [
  {
    name: "Vetores",
    items: [
      {
        title: "Guia consórcio",
        href: "/vetores/consorcio",
      },
    ],
  },
  {
    name: "JSON",
    items: [
      {
        title: "Ofertas renegociação",
        href: "/api/mock/cobranca/oferta",
      },
    ],
  },
  {
    name: "Cards",
    type: "grid",
    items: [
      {
        title: "Card Carousel Compact",
        cover:
          "/card/contrato?mode=compact&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia",
        href: "/card/contrato?mode=compact&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia",
      },
      {
        title: "Card Carousel Full",
        cover:
          "/card/contrato?mode=full&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia",
        href: "/card/contrato?mode=full&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia",
      },
      {
        title: "Progress Card %",
        cover:
          "/card/progresso?title=Progresso&current=50&total=100&label=50%25%20contemplado&colorBackground=%23F0F0F0&colorProgress=linear-gradient%28201deg%2Crgba%28174%2C%20227%2C%20238%2C%201%29%200%25%2C%20rgba%28148%2C%20162%2C%20233%2C%201%29%20100%25%29&colorText=%234F46E5",
        href: "/card/progresso?title=Progresso&current=50&total=100&label=50%25%20contemplado&colorBackground=%23F0F0F0&colorProgress=linear-gradient%28201deg%2Crgba%28174%2C%20227%2C%20238%2C%201%29%200%25%2C%20rgba%28148%2C%20162%2C%20233%2C%201%29%20100%25%29&colorText=%234F46E5",
      },
      {
        title: "Progress Card unidade",
        cover:
          "/card/progresso?title=Progresso&current=10&total=12&label=1%20de%2012&colorBackground=%23F0F0F0&colorProgress=linear-gradient%28201deg%2Crgba%28174%2C%20227%2C%20238%2C%201%29%200%25%2C%20rgba%28148%2C%20162%2C%20233%2C%201%29%20100%25%29&colorText=%234F46E5",
        href: "/card/progresso?title=Progresso&current=10&total=12&label=1%20de%2012&colorBackground=%23F0F0F0&colorProgress=linear-gradient%28201deg%2Crgba%28174%2C%20227%2C%20238%2C%201%29%200%25%2C%20rgba%28148%2C%20162%2C%20233%2C%201%29%20100%25%29&colorText=%234F46E5",
      },
    ],
  },
];

export default function Home() {
  return (
    <div className="flex pt-4 justify-center min-h-dvh">
      <div className="min-w-lg">
        {data.map((group) => (
          <MenuGroup
            key={JSON.stringify(group)}
            title={group.name}
            type={group.type || "default"}
          >
            {group.items.map((item) => (
              <Item
                key={JSON.stringify(item)}
                title={item.title}
                href={item.href}
                cover={item?.cover}
              />
            ))}
          </MenuGroup>
        ))}
      </div>
    </div>
  );
}

function MenuGroup({
  children,
  title,
  className,
  type,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
  type?: "grid" | "default";
}) {
  const classByType = {
    grid: "grid grid-cols-1 md:grid-cols-2",
    default: "flex flex-col",
  };

  return (
    <div className={`w-full p-4 flex flex-col gap-2`}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className={`w-full flex gap-2 ${classByType[type || "default"]}`}>
        {children}
      </div>
    </div>
  );
}

function Item({
  title,
  href,
  cover,
  className,
}: {
  title: string;
  href: string;
  cover?: string;
  className?: string;
}) {
  return (
    <div
      className={`center bg-indigo-600 flex flex-col rounded-xl gap-2 w-full p-1 ${className}`}
    >
      {cover && (
        <div className="w-full flex-none rounded-lg overflow-hidden relative">
          <Image src={cover} alt={title} width={256} height={256} />
        </div>
      )}

      <Link
        target="_blank"
        href={href}
        className={`text-white flex-1 flex flex-row rounded-lg hover:bg-indigo-700 pointer`}
      >
        <span className={"p-3"}>{title}</span>
      </Link>
    </div>
  );
}
