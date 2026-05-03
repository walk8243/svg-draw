"use client";
import { useRef, useState } from "react";
import { Card } from "@/app/ui/card";
import { motion } from "motion/react";

const soccerPosition: { [key: string]: PlayerPosition } = {
  GK: {
    name: "GK",
    color: "red",
    order: 1,
  },
  DF: {
    name: "DF",
    color: "blue",
    order: 2,
  },
  MF: {
    name: "MF",
    color: "green",
    order: 3,
  },
  FW: {
    name: "FW",
    color: "yellow",
    order: 4,
  },
}
const FORMATIONS: Record<string, FieldPosition[]> = {
  "4-3-3": [
    { id: 1, role: soccerPosition.GK, x: 340, y: 950 },
    { id: 2, role: soccerPosition.DF, x: 100, y: 750 },
    { id: 3, role: soccerPosition.DF, x: 250, y: 800 },
    { id: 4, role: soccerPosition.DF, x: 430, y: 800 },
    { id: 5, role: soccerPosition.DF, x: 580, y: 750 },
    { id: 6, role: soccerPosition.MF, x: 340, y: 600 },
    { id: 7, role: soccerPosition.MF, x: 230, y: 480 },
    { id: 8, role: soccerPosition.MF, x: 450, y: 480 },
    { id: 9, role: soccerPosition.FW, x: 180, y: 250 },
    { id: 10, role: soccerPosition.FW, x: 500, y: 250 },
    { id: 11, role: soccerPosition.FW, x: 340, y: 150 },
  ],
  "4-4-2": [
    { id: 1, role: soccerPosition.GK, x: 340, y: 950 },
    { id: 2, role: soccerPosition.DF, x: 100, y: 750 },
    { id: 3, role: soccerPosition.DF, x: 250, y: 800 },
    { id: 4, role: soccerPosition.DF, x: 430, y: 800 },
    { id: 5, role: soccerPosition.DF, x: 580, y: 750 },
    { id: 6, role: soccerPosition.MF, x: 150, y: 550 },
    { id: 7, role: soccerPosition.MF, x: 280, y: 600 },
    { id: 8, role: soccerPosition.MF, x: 400, y: 600 },
    { id: 9, role: soccerPosition.MF, x: 530, y: 550 },
    { id: 10, role: soccerPosition.FW, x: 250, y: 250 },
    { id: 11, role: soccerPosition.FW, x: 430, y: 250 },
  ],
  "4-2-3-1": [
    { id: 1, role: soccerPosition.GK, x: 340, y: 950 },
    { id: 2, role: soccerPosition.DF, x: 100, y: 750 },
    { id: 3, role: soccerPosition.DF, x: 250, y: 800 },
    { id: 4, role: soccerPosition.DF, x: 430, y: 800 },
    { id: 5, role: soccerPosition.DF, x: 580, y: 750 },
    { id: 6, role: soccerPosition.MF, x: 250, y: 600 },
    { id: 7, role: soccerPosition.MF, x: 430, y: 600 },
    { id: 8, role: soccerPosition.MF, x: 150, y: 400 },
    { id: 9, role: soccerPosition.MF, x: 340, y: 400 },
    { id: 10, role: soccerPosition.MF, x: 530, y: 400 },
    { id: 11, role: soccerPosition.FW, x: 340, y: 200 },
  ],
  "3-5-2": [
    { id: 1, role: soccerPosition.GK, x: 340, y: 950 },
    { id: 2, role: soccerPosition.DF, x: 180, y: 800 },
    { id: 3, role: soccerPosition.DF, x: 340, y: 800 },
    { id: 4, role: soccerPosition.DF, x: 500, y: 800 },
    { id: 5, role: soccerPosition.MF, x: 100, y: 550 },
    { id: 6, role: soccerPosition.MF, x: 250, y: 600 },
    { id: 7, role: soccerPosition.MF, x: 340, y: 500 },
    { id: 8, role: soccerPosition.MF, x: 430, y: 600 },
    { id: 9, role: soccerPosition.MF, x: 580, y: 550 },
    { id: 10, role: soccerPosition.FW, x: 250, y: 250 },
    { id: 11, role: soccerPosition.FW, x: 430, y: 250 },
  ],
  "3-4-3": [
    { id: 1, role: soccerPosition.GK, x: 340, y: 950 },
    { id: 2, role: soccerPosition.DF, x: 180, y: 800 },
    { id: 3, role: soccerPosition.DF, x: 340, y: 800 },
    { id: 4, role: soccerPosition.DF, x: 500, y: 800 },
    { id: 5, role: soccerPosition.MF, x: 150, y: 600 },
    { id: 6, role: soccerPosition.MF, x: 280, y: 550 },
    { id: 7, role: soccerPosition.MF, x: 400, y: 550 },
    { id: 8, role: soccerPosition.MF, x: 530, y: 600 },
    { id: 9, role: soccerPosition.FW, x: 180, y: 250 },
    { id: 10, role: soccerPosition.FW, x: 500, y: 250 },
    { id: 11, role: soccerPosition.FW, x: 340, y: 150 },
  ]
};

const initialPlayers: Player[] = [
  { number: 1, name: "鈴木 彩艶", position: soccerPosition.GK },
  { number: 2, name: "谷口 彰悟", position: soccerPosition.DF },
  { number: 3, name: "板倉 滉", position: soccerPosition.DF },
  { number: 4, name: "冨安 健洋", position: soccerPosition.DF },
  { number: 5, name: "中山 雄太", position: soccerPosition.DF },
  { number: 6, name: "佐野 海舟", position: soccerPosition.MF },
  { number: 7, name: "守田 英正", position: soccerPosition.MF },
  { number: 8, name: "鎌田 大地", position: soccerPosition.MF },
  { number: 9, name: "三笘 薫", position: soccerPosition.FW },
  { number: 10, name: "久保 建英", position: soccerPosition.FW },
  { number: 11, name: "上田 綺世", position: soccerPosition.FW },
  { number: 12, name: "早川 友基", position: soccerPosition.GK },
  { number: 13, name: "渡辺 剛", position: soccerPosition.DF },
  { number: 14, name: "伊藤 洋輝", position: soccerPosition.DF },
  { number: 15, name: "町田 浩樹", position: soccerPosition.DF },
  { number: 16, name: "堂安 律", position: soccerPosition.MF },
  { number: 17, name: "伊東 純也", position: soccerPosition.MF },
  { number: 18, name: "田中 碧", position: soccerPosition.MF },
  { number: 19, name: "前田 大然", position: soccerPosition.FW },
  { number: 20, name: "小川 航基", position: soccerPosition.FW },
];

type SelectionType = { type: 'player', id: number } | { type: 'position', id: number } | null;

export const SoccerField = () => {
  const [currentFormationId, setCurrentFormationId] = useState<string>("4-3-3");
  const [previewFormationId, setPreviewFormationId] = useState<string | null>(null);
  const [playersList, setPlayersList] = useState<Player[]>(initialPlayers);
  const [selection, setSelection] = useState<SelectionType>(null);
  const [selectedPosition, setSelectedPosition] = useState<string>("GK");
  const [selectedName, setSelectedName] = useState<string>("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const currentFieldPositions = FORMATIONS[currentFormationId];

  const formationText = () => {
    return currentFormationId;
  }
  const handleSelect = (type: 'player' | 'position', id: number) => {
    if (!selection) {
      setSelection({ type, id });
      return;
    }
    if (selection.type === type && selection.id === id) {
      setSelection(null);
      return;
    }

    setPlayersList(prev => {
      const newPlayers = [...prev];

      let player1Index = -1;
      let player2Index = -1;
      let pos1Id: number | undefined;
      let pos2Id: number | undefined;

      if (selection.type === 'player') {
        player1Index = newPlayers.findIndex(p => p.number === selection.id);
        pos1Id = player1Index >= 0 ? newPlayers[player1Index].positionId : undefined;
      } else {
        pos1Id = selection.id;
        player1Index = newPlayers.findIndex(p => p.positionId === selection.id);
      }

      if (type === 'player') {
        player2Index = newPlayers.findIndex(p => p.number === id);
        pos2Id = player2Index >= 0 ? newPlayers[player2Index].positionId : undefined;
      } else {
        pos2Id = id;
        player2Index = newPlayers.findIndex(p => p.positionId === id);
      }

      if (player1Index >= 0) {
        newPlayers[player1Index] = { ...newPlayers[player1Index], positionId: pos2Id };
      }
      if (player2Index >= 0) {
        newPlayers[player2Index] = { ...newPlayers[player2Index], positionId: pos1Id };
      }

      return newPlayers;
    });
    setSelection(null);
  };

  return (
    <Card title={`サッカーフォーメーション (${formationText()})`}>
      <div className="flex gap-4 items-start justify-center">
        <div className="w-full min-w-[340px] max-w-[680px]">
          <div className="mb-4">
            <label className="mr-2 font-bold">フォーメーション:</label>
            <select
              value={currentFormationId}
              onChange={(e) => setCurrentFormationId(e.target.value)}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded p-1"
            >
              {Object.keys(FORMATIONS).map(fid => (
                <option key={fid} value={fid}>{fid}</option>
              ))}
            </select>
          </div>
          <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 680 1050" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 1.5 }}>
            <SoccerFieldBase />
            <SoccerFieldPlayers
              players={playersList}
              selection={selection}
              onSelect={handleSelect}
              fieldPositions={currentFieldPositions}
              previewPositions={previewFormationId ? FORMATIONS[previewFormationId] : null}
              onDragMarker={(id, info, startX, startY) => {
                if (!svgRef.current) return;
                const CTM = svgRef.current.getScreenCTM();
                if (!CTM) return;
                const dx = info.offset.x / CTM.a;
                const dy = info.offset.y / CTM.d;

                const currentX = startX + dx;
                const currentY = startY + dy;

                let bestFormationId = currentFormationId;
                let minCost = Infinity;

                Object.entries(FORMATIONS).forEach(([fid, positions]) => {
                  const targetPos = positions.find(p => p.id === id);
                  if (targetPos) {
                    const dist = Math.sqrt(Math.pow(targetPos.x - currentX, 2) + Math.pow(targetPos.y - currentY, 2));
                    if (dist < minCost) {
                      minCost = dist;
                      bestFormationId = fid;
                    }
                  }
                });

                if (minCost < 150) {
                  setPreviewFormationId(bestFormationId);
                } else {
                  setPreviewFormationId(null);
                }
              }}
              onDragMarkerEnd={() => {
                if (previewFormationId) {
                  setCurrentFormationId(previewFormationId);
                }
                setPreviewFormationId(null);
              }}
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <SoccerMembers players={playersList} selection={selection} onSelect={handleSelect} />
          <div className="text-red-700 dark:text-red-200 text-blue-700 dark:text-blue-200 text-green-700 dark:text-green-200 text-yellow-700 dark:text-yellow-200"></div>
          <form className="flex w-max mt-2 gap-2">
            <div className="flex grow py-2 gap-2">
              <select name="position"
                className="flex-none bg-slate-300 dark:bg-slate-700"
                onChange={(e) => { setSelectedPosition(e.target.value) }}>
                {Object.keys(soccerPosition).map((position, index) => (
                  <option key={index} value={position}>{position}</option>
                ))}
              </select>
              <input type="text" name="player" autoComplete="off"
                ref={nameInputRef}
                className="w-32 grow border border-solid border-slate-200 rounded-sm"
                onChange={(e) => { setSelectedName(e.target.value) }} />
            </div>
            <div className="shrink-0">
              <button type="submit"
                className="px-4 py-2 text-slate-900 border border-solid border-slate-900 hover:text-slate-100 hover:bg-slate-900 dark:bg-slate-100 hover:dark:text-slate-900 hover:dark:bg-slate-200 rounded-md cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  if (selectedName === "") return;
                  if (nameInputRef.current) {
                    setSelectedName("");
                    nameInputRef.current.value = "";
                  }
                  setPlayersList(prev => [...prev, { number: prev.length + 1, name: selectedName, position: soccerPosition[selectedPosition] }])
                }}>追加</button>
            </div>
          </form>
        </div>
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

const SoccerFieldPlayers = ({ players, selection, onSelect, fieldPositions, previewPositions, onDragMarker, onDragMarkerEnd }: { players: Player[]; selection: SelectionType; onSelect: (type: 'player' | 'position', id: number) => void; fieldPositions: FieldPosition[]; previewPositions: FieldPosition[] | null; onDragMarker: (id: number, info: any, startX: number, startY: number) => void; onDragMarkerEnd: () => void; }) => (
  <g>
    {previewPositions && previewPositions.map((pos) => (
      <g key={`preview-${pos.id}`} style={{ opacity: 0.3 }}>
        <circle cx={pos.x} cy={pos.y} r={16} fill={pos.role.color} stroke="black" strokeWidth={1} />
      </g>
    ))}
    {fieldPositions.map((pos) => {
      const playerInPos = players.find(p => p.positionId === pos.id);
      const isSelected = (selection?.type === 'position' && selection?.id === pos.id) ||
        (selection?.type === 'player' && playerInPos && selection?.id === playerInPos.number);
      return (
        <SoccerFieldPlayer
          key={pos.id}
          id={pos.id}
          x={pos.x}
          y={pos.y}
          name={playerInPos?.name}
          number={playerInPos?.number}
          position={pos.role}
          isSelected={isSelected}
          onClick={() => onSelect('position', pos.id)}
          onDrag={(e, info) => onDragMarker(pos.id, info, pos.x, pos.y)}
          onDragEnd={onDragMarkerEnd}
        />
      );
    })}
  </g>
);
const SoccerFieldPlayer = ({ id, x, y, name, number, position, isSelected, onClick, onDrag, onDragEnd }: { id: number, x: number, y: number, name?: string, number?: number, position: PlayerPosition, isSelected?: boolean, onClick?: () => void, onDrag?: (e: any, info: any) => void, onDragEnd?: () => void }) => (
  <motion.g
    onClick={onClick}
    className="cursor-pointer"
    initial={false}
    animate={{ x, y }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    drag
    dragMomentum={false}
    onDrag={onDrag}
    onDragEnd={onDragEnd}
  >
    <circle cx={0} cy={0} r={isSelected ? 20 : 16} fill={position.color} stroke={isSelected ? "#ff0000" : "black"} strokeWidth={isSelected ? 3 : 1} style={{ transition: 'all 0.2s' }} />
    {number !== undefined && <text x={0} y={0} textAnchor="middle" dominantBaseline="central" fontSize={isSelected ? 16 : 14} fill={position.color === 'yellow' ? 'black' : 'white'} fontWeight={isSelected ? 'bold' : 'normal'} style={{ pointerEvents: 'none', transition: 'all 0.2s' }}>{number}</text>}
    {name && <text x={0} y={-(isSelected ? 27 : 23)} textAnchor="middle" fontSize={isSelected ? 28 : 24} fill={isSelected ? "#ff0000" : "black"} fontWeight={isSelected ? "bold" : "normal"} style={{ pointerEvents: 'none', transition: 'all 0.2s' }}>{name}</text>}
  </motion.g>
);

const SoccerMembers = ({ players, selection, onSelect }: { players: Player[]; selection: SelectionType; onSelect: (type: 'player' | 'position', id: number) => void }) => {
  const groupedPlayers =
    Object.entries(Object.groupBy(players, (player) => player.position.name))
      .flatMap(([_key, value]) => value ?? []);
  return (
    <ul className="flex flex-col gap-1">
      {groupedPlayers.map((player, index) => (
        <li
          key={index}
          className={`flex gap-2 rounded px-1 cursor-pointer transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 ${(selection?.type === 'player' && selection.id === player.number) ? 'bg-slate-300 dark:bg-slate-700 font-bold' : ''}`}
          onClick={() => onSelect('player', player.number)}
        >
          <span className="w-7 text-right">{player.number}</span>
          <span className={`w-10 text-center text-${player.position.color}-700 dark:text-${player.position.color}-200`}>{player.position.name}</span>
          <span className="w-20">{player.name}</span>
        </li>
      ))}
    </ul>
  );
}

type PlayerPosition = { name: string; color: string; order: number };
type FieldPosition = {
  id: number;
  role: PlayerPosition;
  x: number;
  y: number;
};
type Player = {
  number: number;
  name: string;
  position: PlayerPosition;
  positionId?: number;
};
