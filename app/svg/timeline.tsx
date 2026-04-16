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

            {/* 矢印の先端 */}
            <marker id="arrowhead-curve" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#3178C6" />
            </marker>
          </defs>

          {/* 加速度的に伸びる曲線パス（Q: 2次ベジェ曲線） */}
          <path 
            d={`M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`}
            fill="none"
            stroke="url(#arrow-gradient-curve)" 
            strokeWidth="14" 
            strokeLinecap="round"
            markerEnd="url(#arrowhead-curve)"
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
