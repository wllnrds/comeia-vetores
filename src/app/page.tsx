import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex pt-4 justify-center min-h-dvh">
      <div className="min-w-lg">
        <MenuGroup title="Vetores">
          <Item title="Guia consórcio" href="/consorcio" />
        </MenuGroup>
        <MenuGroup title="JSON">
          <Item title="Ofertas renegociação" href="/cobranca/oferta" />
        </MenuGroup>
        <MenuGroup title="Outros" className="flex-row gap-2 flex-wrap">
          <Item
            title="Card Carousel Compact"
            cover="/card?mode=compact&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia"
            href="/card?mode=compact&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia"
          />
          <Item
            title="Card Carousel Full"
            cover="/card?mode=full&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia"
            href="/card?mode=full&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia"
          />
        </MenuGroup>
      </div>
    </div>
  );
}

function MenuGroup({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div className={`w-full flex flex-col gap-2 p-4`}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className={`w-full flex gap-2 ${className}`}>{children}</div>
    </div>
  );
}

function Item({
  title,
  href,
  cover,
}: {
  title: string;
  href: string;
  cover?: string;
}) {
  return (
    <div className="center bg-indigo-600 flex flex-col rounded-xl gap-2 flex-1 p-1">
      {cover && (
        <div className="aspect-square w-full flex-none rounded-lg overflow-hidden relative">
          <Image src={cover} alt={title} fill />
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
