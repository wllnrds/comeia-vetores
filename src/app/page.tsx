import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      <div className="min-w-lg">
        <MenuGroup title="Vetores">
          <Item title="Guia consórcio" href="/consorcio" />
        </MenuGroup>
        <MenuGroup title="JSON">
          <Item title="Ofertas renegociação" href="/cobranca/oferta" />
        </MenuGroup>
        <MenuGroup title="Outros">
          <Item
            title="Card Carousel Compact"
            href="/card?mode=compact&headline=FINAL%204045&title=Cart%C3%A3o%20de%20Cr%C3%A9dito%20Visa&subtitle=vencimento%2010/25&value=R$%20100,00&tagName=em%20dia"
          />
          <Item
            title="Card Carousel Full"
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
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="w-full flex flex-col gap-2 p-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {children}
    </div>
  );
}

function Item({ title, href }: { title: string; href: string }) {
  return (
    <div className="center bg-indigo-600 hover:bg-indigo-700 pointer flex flex-col rounded-lg gap-4">
      <Link target="_blank" href={href} className="text-white flex-1  p-6">
        {title}
      </Link>
    </div>
  );
}
