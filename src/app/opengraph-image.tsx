import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "aiCartograph — Knowledge Resolution Platform";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #060f15 0%, #071319 40%, #091e26 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#FDFFFF",
              display: "flex",
            }}
          >
            <span style={{ color: "#4597b0" }}>ai</span>
            <span>Cartograph</span>
          </div>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#4597b0",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            marginBottom: "24px",
            display: "flex",
          }}
        >
          Knowledge Resolution Platform
        </div>
        <div
          style={{
            fontSize: "40px",
            fontWeight: 700,
            color: "#FDFFFF",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.3,
            display: "flex",
          }}
        >
          Every answer. Everywhere. The moment it matters.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "18px",
            color: "rgba(253,255,255,0.4)",
            display: "flex",
          }}
        >
          aicartograph.com
        </div>
      </div>
    ),
    { ...size }
  );
}
