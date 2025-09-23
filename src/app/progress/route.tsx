import { Oswald } from "next/font/google";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

type DATA_CARD = {
  title?: string;
  total: number;
  current: number;
  label?: string;
  background?: string;
  colorBackground?: string;
  colorProgress?: string;
  colorText?: string;
};

const CARD_SIZE = {
  width: 1080,
  height: 608,
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const data: DATA_CARD = {
    title: searchParams.get("title") || undefined,
    total: searchParams.get("total") ? Number(searchParams.get("total")) : 100,
    current: searchParams.get("current")
      ? Number(searchParams.get("current"))
      : 0,
    label: searchParams.get("label") || undefined,
    background: searchParams.get("background") || "white",
    colorBackground: searchParams.get("colorBackground") || undefined,
    colorProgress: searchParams.get("colorProgress") || undefined,
    colorText: searchParams.get("colorText") || undefined,
  };

  async function loadGoogleFont(font: string, text: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(
      text
    )}`;
    const css = await (await fetch(url)).text();
    const resource = css.match(
      /src: url\((.+)\) format\('(opentype|truetype)'\)/
    );

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status == 200) {
        return await response.arrayBuffer();
      }
    }

    throw new Error("failed to load font data");
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          color: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: data.background || "white",
          gap: 40,
        }}
      >
        {data.title && <div style={{ display: "flex" }}>{data.title}</div>}
        <div
          style={{
            display: "flex",
            background: data.colorBackground || "#EEEEEE",
            borderRadius: "100px",
            height: "15vh",
            width: "90%",
            position: "relative",
          }}
        >
          {
            <div
              style={{
                background: data.colorProgress || "#000000",
                height: "100%",
                width: `${(data.current / data.total) * 100}%`,
                borderRadius: "100px",
                position: "absolute",
                top: 0,
                left: 0,
                transition: "width 1s ease-in-out",
              }}
            />
          }
          {data.label && (
            <div
              style={{
                display: "flex",
                position: "absolute",
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 32,
                zIndex: 9999,
                color: data.colorText || "#000000",
                filter: "brightness(0.9)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {data.label}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: CARD_SIZE.width,
      height: CARD_SIZE.height,
      fonts: data.title
        ? [
            {
              name: "Oswald",
              data: await loadGoogleFont(
                "Oswald",
                [data.title, data.label].join(" ")
              ),
              style: "normal",
            },
          ]
        : [],
    }
  );
}
