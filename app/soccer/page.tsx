"use client";
import { useRef } from "react";
import { SoccerField } from "../svg/soccer";

export default function Soccer() {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDownload = () => {
    const svgElement = svgRef.current;
    if (!svgElement) return;

    const serializer = new XMLSerializer();
    let svgString = serializer.serializeToString(svgElement);

    if (!svgString.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }

    const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const viewBox = svgElement.getAttribute("viewBox");
      let width = 680;
      let height = 1050;

      if (viewBox) {
        const parts = viewBox.split(" ");
        if (parts.length === 4) {
          width = parseInt(parts[2], 10);
          height = parseInt(parts[3], 10);
        }
      } else {
        const rect = svgElement.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 追加: 透かし(Watermark)の描画
      ctx.font = "bold 24px 'Inter', sans-serif";
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.textAlign = "right";
      ctx.textBaseline = "bottom";
      ctx.fillText("© walk8243", canvas.width - 20, canvas.height - 20);

      const jpgUrl = canvas.toDataURL("image/jpeg", 0.9);
      const a = document.createElement("a");
      a.href = jpgUrl;
      a.download = "formation.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <main className="p-4 flex flex-col items-center">
      <h1 className="h-0 invisible overflow-hidden">サッカーフォーメーション</h1>
      <div className="w-full max-w-5xl flex justify-center">
        <SoccerField svgRef={svgRef} />
      </div>
      <div className="w-full max-w-5xl flex justify-center mt-4">
        <button
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow cursor-pointer transition-colors"
        >
          画像としてダウンロード
        </button>
      </div>
    </main>
  );
}
