import { Card } from "@/app/ui/card";

const data = [
  { year: "1995", title: "Mocha", desc: "原型Mocha開発" },
  { year: "1997", title: "ECMAScript", desc: "ECMAScript標準化" },
  { year: "2004", title: "Ajax", desc: "Google実用化" },
  { year: "2006", title: "jQuery", desc: "裾野が劇的に広がる" },
  { year: "2008", title: "V8", desc: "劇的な高速化" },
  { year: "2009", title: "Node.js", desc: "サーバーでも利用可能に" },
  { year: "2010", title: "npm", desc: "高速ビルド文化の誕生" },
  { year: "2010-", title: "モダンFW", desc: "React, Vueなど登場" },
  { year: "2014", title: "TypeScript", desc: "MSが静的型付けTS開発" },
  { year: "2015", title: "ES6", desc: "モダンJSの基礎が整う" },
  { year: "2018-", title: "代替ランタイム", desc: "Deno, Bunなど登場" },
  { year: "2024", title: "Pythonの台頭", desc: "生成AIでGitHub1位奪われる" },
  { year: "2025", title: "TS首位へ", desc: "AIコーディングでTSが1位" },
];

export const Timeline = () => {
  // 曲線（ベジェ曲線）の制御点
  // P0 = 開始点, P1 = 引っ張る制御点, P2 = 終了点
  const P0 = { x: 100, y: 750 };
  const P1 = { x: 600, y: 750 }; // P1を左下に寄せることで、後半にかけて急激に伸びる「加速度的な」カーブを作ります
  const P2 = { x: 1500, y: 100 };

  // 時代が進むにつれて太くなる矢印形を、パスとして計算します
  const buildThickCurve = () => {
    const steps = 100;
    const points1 = [];
    const points2 = [];

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = Math.pow(1 - t, 2) * P0.x + 2 * (1 - t) * t * P1.x + Math.pow(t, 2) * P2.x;
      const py = Math.pow(1 - t, 2) * P0.y + 2 * (1 - t) * t * P1.y + Math.pow(t, 2) * P2.y;

      const vx = 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
      const vy = 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);
      const len = Math.sqrt(vx * vx + vy * vy);
      const nx = -vy / len;
      const ny = vx / len;

      // 次第に太くなるように調整 (t=0で3px, t=1で約25pxの半径＝合計幅50px)
      const r = 3 + 22 * Math.pow(t, 2);

      points1.push({ x: px + nx * r, y: py + ny * r });
      points2.push({ x: px - nx * r, y: py - ny * r });
    }

    // 矢印の先端部を構成する座標計算
    const finalVx = 2 * (P2.x - P1.x);
    const finalVy = 2 * (P2.y - P1.y);
    const len = Math.sqrt(finalVx * finalVx + finalVy * finalVy);
    const tx = finalVx / len;
    const ty = finalVy / len;

    // 矢印の三角部分をより大きく力強く設定
    const headLength = 130;  // 50 -> 130 に拡大
    const headWidth = 100;   // 40 -> 100 に拡大 (左右で合計200px幅の巨大な先端)

    const tip = { x: P2.x + tx * headLength, y: P2.y + ty * headLength };
    const leftCorner = { x: P2.x - ty * headWidth, y: P2.y + tx * headWidth };
    const rightCorner = { x: P2.x + ty * headWidth, y: P2.y - tx * headWidth };

    let d = `M ${points1[0].x} ${points1[0].y}`;
    for (let i = 1; i <= steps; i++) d += ` L ${points1[i].x} ${points1[i].y}`;
    d += ` L ${leftCorner.x} ${leftCorner.y} L ${tip.x} ${tip.y} L ${rightCorner.x} ${rightCorner.y} L ${points2[steps].x} ${points2[steps].y}`;
    for (let i = steps - 1; i >= 0; i--) d += ` L ${points2[i].x} ${points2[i].y}`;
    d += " Z";

    return d;
  };

  return (
    <Card title="JavaScriptの歴史・普及の軌跡">
      {/* 
        横長（panorama）のレイアウトにし、よりダイナミックなタイムラインを描写 
        min-w-[1000px] と 1600x850 のviewBoxで対応
      */}
      <div className="min-w-[1000px] h-full overflow-visible py-4 pb-8">
        <svg viewBox="0 0 1600 850" className="w-full h-auto">
          <defs>
            <linearGradient id="arrow-gradient-curve" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#F7DF1E" />
              <stop offset="40%" stopColor="#dcb329" />
              <stop offset="100%" stopColor="#3178C6" />
            </linearGradient>
          </defs>

          {/* 塗りつぶしのダイナミック曲線パスとして描画 */}
          <path
            d={buildThickCurve()}
            fill="url(#arrow-gradient-curve)"
            className="transition-all duration-700 hover:opacity-90"
          />

          {/* Points & Labels */}
          {data.map((d, i) => {
            // t は 0 から 1 の間で変化
            const t = i / (data.length - 1);

            // 2次ベジェ曲線の公式を用いて線上のX, Y座標を計算
            // B(t) = (1-t)^2*P0 + 2(1-t)t*P1 + t^2*P2
            const px = Math.pow(1 - t, 2) * P0.x + 2 * (1 - t) * t * P1.x + Math.pow(t, 2) * P2.x;
            const py = Math.pow(1 - t, 2) * P0.y + 2 * (1 - t) * t * P1.y + Math.pow(t, 2) * P2.y;

            // ラベルの配置を交互に (左上 or 右下)
            // ただし横長なので、上側・下側により広く配置
            const isTopLeft = i % 2 === 0;
            let textX = isTopLeft ? px - 15 : px + 15;
            const textY = isTopLeft ? py - 40 : py + 40;
            let anchor = isTopLeft ? "end" : "start" as "start" | "end" | "middle";

            // 右端に近づく「Pythonの台頭 (i=11)」は、オリジナル位置（px + 15, start）から
            // 約1文字分だけ左にずらして画面内に収めます
            if (d.title === "Pythonの台頭" || i === 11) {
              anchor = "start";
              textX = px - 15; // px + 15 の状態から30px分左へシフト
            }

            // 「ECMAScript (i=1)」がjQueryと被るため、約3文字分（約60px）左にずらします
            if (d.title === "ECMAScript" || i === 1) {
              textX -= 60;
            }

            const strokeColor = i >= 11 ? "#3178C6" : "#e6c300";

            return (
              <g key={i} className="group">
                {/* テキストへの指示線 */}
                <line
                  x1={px} y1={py}
                  x2={textX} y2={textY}
                  stroke="currentColor"
                  strokeOpacity={0.3}
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="text-gray-400 dark:text-gray-500"
                />

                {/* タイムラインのノード */}
                <circle
                  cx={px} cy={py}
                  r={9}
                  fill="#fff"
                  stroke={strokeColor}
                  strokeWidth="4"
                  className="transition-transform group-hover:scale-150"
                />

                {/* 年とタイトル */}
                <text
                  x={textX}
                  y={isTopLeft ? textY - 12 : textY + 8}
                  textAnchor={anchor}
                  className="text-2xl font-bold fill-gray-900 dark:fill-white"
                >
                  {d.year} - {d.title}
                </text>

                {/* 詳細テキスト */}
                <text
                  x={textX}
                  y={isTopLeft ? textY + 16 : textY + 34}
                  textAnchor={anchor}
                  className="text-[1.15rem] fill-gray-600 dark:fill-gray-400"
                >
                  {d.desc}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </Card>
  );
};
