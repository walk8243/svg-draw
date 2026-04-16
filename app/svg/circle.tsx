import { Card } from "@/app/ui/card";

export const CircleGraph = () => {
  const data = [
    { label: '窒素', value: 78.08, color: '#3b82f6' },
    { label: '酸素', value: 20.95, color: '#10b981' },
    { label: 'アルゴン', value: 0.93, color: '#f59e0b' },
    { label: 'その他', value: 0.04, color: '#ef4444' },
  ];

  let cumulativePercent = 0;

  const slices = data.map(slice => {
    const startPercent = cumulativePercent / 100;
    const endPercent = (cumulativePercent + slice.value) / 100;
    cumulativePercent += slice.value;

    const startX = Math.cos(2 * Math.PI * startPercent - Math.PI / 2) * 100;
    const startY = Math.sin(2 * Math.PI * startPercent - Math.PI / 2) * 100;
    const endX = Math.cos(2 * Math.PI * endPercent - Math.PI / 2) * 100;
    const endY = Math.sin(2 * Math.PI * endPercent - Math.PI / 2) * 100;

    const largeArcFlag = slice.value > 50 ? 1 : 0;

    const pathData = [
      `M 100 100`,
      `L ${100 + startX} ${100 + startY}`,
      `A 100 100 0 ${largeArcFlag} 1 ${100 + endX} ${100 + endY}`,
      `Z`
    ].join(' ');

    return {
      ...slice,
      pathData
    };
  });

  return (
    <Card title="地球の大気成分 (Earth's Atmosphere)">
      <div className="flex min-w-[450px] gap-8 items-center justify-center">
        <svg width="240" height="240" viewBox="-10 -10 220 220" className="drop-shadow-md">
          {slices.map((slice, index) => (
            <path
              key={index}
              d={slice.pathData}
              fill={slice.color}
              stroke="#ffffff"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            >
              <title>{`${slice.label}: ${slice.value}%`}</title>
            </path>
          ))}
        </svg>
        <div className="flex flex-col gap-3 min-w-[200px]">
          {data.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <span className="text-sm font-bold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
