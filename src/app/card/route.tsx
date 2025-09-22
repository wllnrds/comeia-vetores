import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

type DATA_CARD = {
  mode?: string;
  headline?: string;
  title?: string;
  subtitle?: string;
  value?: string;
  tag?: {
    name?: string;
    color?: string;
  };
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const data: DATA_CARD = {
    mode: searchParams.get("mode") || "full",
    headline: searchParams.get("headline") || undefined,
    title: searchParams.get("title") || undefined,
    subtitle: searchParams.get("subtitle") || undefined,
    value: searchParams.get("value") || undefined,
    tag: searchParams.has("tagName")
      ? {
          name: searchParams.get("tagName") || undefined,
          color: searchParams.get("tagColor") || undefined,
        }
      : undefined,
  };

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "1080px",
            minHeight: data?.mode === "compact" ? "607.5px" : "1080px",
            padding: "48px",
          }}
        >
          {data.headline && (
            <div style={{ fontSize: "32px", fontWeight: "300" }}>
              {data.headline}
            </div>
          )}
          {data.title && (
            <div style={{ fontSize: "72px", fontWeight: "700" }}>
              {data.title}
            </div>
          )}
          {(data?.tag?.name || data.subtitle) && (
            <div
              style={{
                fontSize: "32px",
                fontWeight: "400",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "16px",
                paddingTop: "16px",
              }}
            >
              {data?.tag?.name && (
                <span
                  style={{
                    padding: "16px",
                    background: data?.tag?.color || "lightgray",
                    borderRadius: "16px",
                  }}
                >
                  {data.tag.name}
                </span>
              )}
              {data.subtitle && (
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "400",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.subtitle}
                </div>
              )}
            </div>
          )}
          <div style={{ flex: 1 }}></div>
          {data.value && (
            <div style={{ fontSize: "96px", fontWeight: "400" }}>
              {data.value}
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}
