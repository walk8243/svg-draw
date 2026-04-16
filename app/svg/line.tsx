import { Card } from "@/app/ui/card";
import { promises as fs } from 'fs';
import path from 'path';

export const LineGraph = async () => {
  const filePath = path.join(process.cwd(), 'public', 'stock_4689.csv');
  const csv = await fs.readFile(filePath, 'utf-8');

  const lines = csv.trim().split('\n').slice(1);
  const data = lines.map(line => {
    // CSV fields are surrounded by quotes, so line format is: "val1","val2"...
    const cols = line.replace(/(^"|"$)/g, '').split('","');
    return {
      date: cols[0],
      price: parseFloat(cols[4].replace(/,/g, '')),
      volume: parseFloat(cols[6].replace(/,/g, ''))
    };
  }).reverse();

  // SVG Geometry
  const width = 800;
  const height = 400;
  const padding = { top: 40, right: 60, bottom: 40, left: 20 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  // Scales
  const minPrice = Math.min(...data.map(d => d.price)) * 0.95; // Give 5% head room
  const maxPrice = Math.max(...data.map(d => d.price)) * 1.05;
  const priceRange = maxPrice - minPrice;
  const maxVolume = Math.max(...data.map(d => d.volume));

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * plotWidth;
  const getPriceY = (price: number) => padding.top + plotHeight - ((price - minPrice) / priceRange) * plotHeight;
  const getVolumeY = (volume: number) => padding.top + plotHeight - (volume / maxVolume) * (plotHeight * 0.3); // Volume takes bottom 30%

  // Path data
  const linePath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getPriceY(d.price)}`).join(' ');
  const areaPath = `${linePath} V ${padding.top + plotHeight} H ${padding.left} Z`;

  // Grid lines
  const numGridLines = 5;
  const gridLines = Array.from({ length: numGridLines }).map((_, i) => {
    const y = padding.top + (i / (numGridLines - 1)) * plotHeight;
    const value = maxPrice - (i / (numGridLines - 1)) * priceRange;
    return { y, value };
  });

  return (
    <Card title="株価推移 (終値・出来高)">
      <div className="w-full min-w-[600px]">
        <svg viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#9ca3af" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid lines and labels */}
          {gridLines.map((grid, i) => (
            <g key={i}>
              <line
                x1={padding.left}
                y1={grid.y}
                x2={width - padding.right}
                y2={grid.y}
                stroke="currentColor"
                strokeOpacity="0.1"
                strokeDasharray="4 4"
              />
              <text
                x={width - padding.right + 10}
                y={grid.y}
                alignmentBaseline="middle"
                className="text-xs fill-gray-500 dark:fill-gray-400"
              >
                ¥{grid.value.toFixed(0)}
              </text>
            </g>
          ))}

          {/* Volume bars */}
          {data.map((d, i) => (
            <rect
              key={`vol-${i}`}
              x={getX(i) - (plotWidth / data.length) * 0.4}
              y={getVolumeY(d.volume)}
              width={(plotWidth / data.length) * 0.8}
              height={padding.top + plotHeight - getVolumeY(d.volume)}
              fill="url(#volumeGradient)"
              rx="1"
            />
          ))}

          {/* Area */}
          <path d={areaPath} fill="url(#priceGradient)" />

          {/* Line */}
          <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

          {/* Start and end dates */}
          <text x={padding.left} y={height - 10} className="text-xs fill-gray-500 dark:fill-gray-400">
            {data[0].date}
          </text>
          <text x={width - padding.right} y={height - 10} textAnchor="end" className="text-xs fill-gray-500 dark:fill-gray-400">
            {data[data.length - 1].date}
          </text>
        </svg>
      </div>
    </Card>
  );
};
