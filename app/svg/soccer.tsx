import { Card } from "@/app/ui/card";

const soccerPosition: { [key: string]: PlayerPosition } = {
  GK: {
    color: "red",
  },
  DF: {
    color: "blue",
  },
  MF: {
    color: "green",
  },
  FW: {
    color: "yellow",
  },
}
const players: Player[] = [
  {
    name: "鈴木 彩艶",
    position: soccerPosition.GK,
    x: 340,
    y: 950,
  },
  {
    name: "谷口 彰悟",
    position: soccerPosition.DF,
    x: 100,
    y: 750,
  },
  {
    name: "板倉 滉",
    position: soccerPosition.DF,
    x: 250,
    y: 800,
  },
  {
    name: "冨安 健洋",
    position: soccerPosition.DF,
    x: 430,
    y: 800,
  },
  {
    name: "中山 雄太",
    position: soccerPosition.DF,
    x: 580,
    y: 750,
  },
  {
    name: "佐野 海舟",
    position: soccerPosition.MF,
    x: 340,
    y: 600,
  },
  {
    name: "守田 英正",
    position: soccerPosition.MF,
    x: 230,
    y: 480,
  },
  {
    name: "鎌田 大地",
    position: soccerPosition.MF,
    x: 450,
    y: 480,
  },
  {
    name: "三笘 薫",
    position: soccerPosition.FW,
    x: 180,
    y: 250,
  },
  {
    name: "久保 建英",
    position: soccerPosition.FW,
    x: 500,
    y: 250,
  },
  {
    name: "上田 綺世",
    position: soccerPosition.FW,
    x: 340,
    y: 150,
  },
];

export const SoccerField = () => {
  return (
    <Card title="サッカーフォーメーション">
      <div className="w-[680px] max-w-full">
        <svg width="100%" height="100%" viewBox="0 0 680 1050" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 1.5 }}>
          <SoccerFieldBase />
          <SoccerPlayers players={players} />
        </svg>
      </div>
    </Card>
  );
};

const SoccerFieldBase = () => (
  <g>
    <g>
      <rect x="0" y="0" width="680" height="1050" fill="#5ebf40" />
    </g>
    <g transform="matrix(0.084667,0,0,0.084667,0,0)">
      <rect x="0" y="0" width="8031.496" height="12401.575" fill="none" stroke="white" strokeWidth="25" />
      <path d="M0,6200.787L8031.496,6200.787" fill="none" stroke="white" strokeWidth="12.5" />
      <g transform="matrix(3.758968,0,0,1.350447,-11619.674225,-410.83912)">
        <ellipse cx="4159.499" cy="4895.881" rx="143.751" ry="400.13" fill="none" stroke="white" strokeWidth="4.43" />
      </g>
      <g transform="matrix(0.111772,-0,-0,0.161186,3640.288671,4660.125839)">
        <ellipse cx="3359.156" cy="9558.275" rx="116.238" ry="80.603" fill="white" />
      </g>
    </g>
    <g transform="matrix(0.084667,0,0,0.084667,0,0)">
      <g transform="matrix(0.974006,0,0,0.521225,533.534584,6919.652645)">
        <rect x="2453.468" y="9271.073" width="2243.352" height="1246.307" fill="none" stroke="white" strokeWidth="16" />
      </g>
      <g transform="matrix(5.478075,0,0,3.672596,-11136.692499,-24132.884793)">
        <rect x="2329.415" y="9417.219" width="873.202" height="530.638" fill="none" stroke="white" strokeWidth="2.68" />
      </g>
      <g transform="matrix(0.111772,0,0,0.161186,3640.288671,9561.700642)">
        <ellipse cx="3359.156" cy="9558.275" rx="116.238" ry="80.603" fill="white" />
      </g>
      <g transform="matrix(3.056694,0,0,3.972669,-5526.757916,-28267.199616)">
        <path d="M2839.341,9746.584C2873.42,9711.796 2918.095,9683.492 2969.661,9664.523C3015.762,9647.565 3067.37,9638.067 3121.839,9638.067C3237.233,9638.067 3339.789,9680.695 3404.337,9746.584" fill="none" stroke="white" strokeWidth="3.53" />
      </g>
    </g>
    <g transform="matrix(-0.084667,-0,0,-0.084667,680,1050)">
      <g transform="matrix(0.974006,0,0,0.521225,533.534584,6919.652645)">
        <rect x="2453.468" y="9271.073" width="2243.352" height="1246.307" fill="none" stroke="white" strokeWidth="16" />
      </g>
      <g transform="matrix(5.478075,0,0,3.672596,-11136.692499,-24132.884793)">
        <rect x="2329.415" y="9417.219" width="873.202" height="530.638" fill="none" stroke="white" strokeWidth="2.68" />
      </g>
      <g transform="matrix(0.111772,0,0,0.161186,3640.288671,9561.700642)">
        <ellipse cx="3359.156" cy="9558.275" rx="116.238" ry="80.603" fill="white" />
      </g>
      <g transform="matrix(3.056694,0,0,3.972669,-5526.757916,-28267.199616)">
        <path d="M2839.341,9746.584C2873.42,9711.796 2918.095,9683.492 2969.661,9664.523C3015.762,9647.565 3067.37,9638.067 3121.839,9638.067C3237.233,9638.067 3339.789,9680.695 3404.337,9746.584" fill="none" stroke="white" strokeWidth="3.53" />
      </g>
    </g>
    <g transform="matrix(0.084667,0,0,0.084667,0,0)">
      <g transform="matrix(0.31855,0,0,0.317424,-190.865771,8771.680693)">
        <path d="M599.171,11215.173C610.891,11212.838 623.008,11211.614 635.408,11211.614C737.726,11211.614 820.795,11294.978 820.795,11397.659C820.795,11410.61 819.474,11423.255 816.959,11435.463" fill="none" stroke="white" strokeWidth="39.31" />
      </g>
      <g transform="matrix(0,-0.31855,0.317424,0,4401.601953,12592.440574)">
        <path d="M599.171,11215.173C610.891,11212.838 623.008,11211.614 635.408,11211.614C737.726,11211.614 820.795,11294.978 820.795,11397.659C820.795,11410.61 819.474,11423.255 816.959,11435.463" fill="none" stroke="white" strokeWidth="39.31" />
      </g>
      <g transform="matrix(-0.31855,-0,0,-0.317424,8222.361834,3629.89411)">
        <path d="M599.171,11215.173C610.891,11212.838 623.008,11211.614 635.408,11211.614C737.726,11211.614 820.795,11294.978 820.795,11397.659C820.795,11410.61 819.474,11423.255 816.959,11435.463" fill="none" stroke="white" strokeWidth="39.31" />
      </g>
      <g transform="matrix(0,0.31855,-0.317424,0,3629.89411,-190.865771)">
        <path d="M599.171,11215.173C610.891,11212.838 623.008,11211.614 635.408,11211.614C737.726,11211.614 820.795,11294.978 820.795,11397.659C820.795,11410.61 819.474,11423.255 816.959,11435.463" fill="none" stroke="white" strokeWidth="39.31" />
      </g>
    </g>
  </g>
);

const SoccerPlayers = ({ players }: { players: Player[] }) => (
  <g>
    {players.map((player, index) => (
      <SoccerPlayer key={index} {...player} />
    ))}
  </g>
);

const SoccerPlayer = ({ x, y, name, position }: Player) => (
  <g>
    <circle cx={x} cy={y} r={16} fill={position.color} stroke="black" strokeWidth={1} />
    <text x={x} y={y - 23} textAnchor="middle" fontSize={24} fill="black">{name}</text>
  </g>
);

type PlayerPosition = { color: string };
type Player = {
  name: string;
  position: PlayerPosition;
  x: number;
  y: number;
};
