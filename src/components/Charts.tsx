import React from 'react';

export const ScoreLineChart: React.FC<{
  points: { label: string; score: number }[];
  targetScore?: number;
}> = ({ points, targetScore = 75 }) => {
  if (points.length === 0) {
    return (
      <div className="flex h-44 items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500 dark:border-slate-700">
        Complète une première session pour voir l’évolution de tes scores.
      </div>
    );
  }

  const width = 420;
  const height = 180;
  const padL = 36;
  const padR = 18;
  const padT = 18;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;

  const coords = points.map((p, i) => {
    const x =
      points.length === 1
        ? padL + innerW / 2
        : padL + (i / (points.length - 1)) * innerW;
    const y = padT + innerH - (Math.min(100, Math.max(0, p.score)) / 100) * innerH;
    return { ...p, x, y };
  });

  const polyline = coords.map((c) => `${c.x},${c.y}`).join(' ');
  const targetY = padT + innerH - (targetScore / 100) * innerH;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-48 w-full"
      role="img"
      aria-label="Graphique d’évolution des scores"
    >
      {[0, 25, 50, 75, 100].map((v) => {
        const y = padT + innerH - (v / 100) * innerH;
        return (
          <g key={v}>
            <line
              x1={padL}
              y1={y}
              x2={width - padR}
              y2={y}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-800"
              strokeWidth="1"
            />
            <text x={6} y={y + 4} fontSize="10" className="fill-slate-500 dark:fill-slate-400">
              {v}%
            </text>
          </g>
        );
      })}

      {/* Target line */}
      <line
        x1={padL}
        y1={targetY}
        x2={width - padR}
        y2={targetY}
        stroke="#D97706"
        strokeDasharray="4 4"
        strokeWidth="1.5"
      />
      <text x={width - padR - 72} y={targetY - 5} fontSize="10" fill="#D97706" fontWeight="bold">
        Objectif {targetScore}%
      </text>

      {coords.length > 1 && (
        <polyline
          fill="none"
          stroke="#1D4ED8"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={polyline}
        />
      )}

      {coords.map((c, idx) => (
        <g key={`${c.label}-${idx}`}>
          <circle cx={c.x} cy={c.y} r="5" fill="#FFFFFF" stroke="#1D4ED8" strokeWidth="2.5" />
          <text
            x={c.x}
            y={c.y - 9}
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            className="fill-slate-800 dark:fill-slate-100"
          >
            {c.score}%
          </text>
          <text
            x={c.x}
            y={height - 8}
            textAnchor="middle"
            fontSize="9.5"
            className="fill-slate-500 dark:fill-slate-400"
          >
            {c.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export const SubjectProgressBars: React.FC<{
  items: { id: string; name: string; score: number; count: number; color: string }[];
}> = ({ items }) => {
  if (items.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Aucune donnée par matière pour le moment. Lance un quiz rapide !
      </p>
    );
  }
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const statusLabel =
          item.score >= 75 ? 'Maîtrisée' : item.score >= 55 ? 'En progrès' : 'À renforcer';
        const statusTone =
          item.score >= 75
            ? 'text-emerald-700 dark:text-emerald-300'
            : item.score >= 55
            ? 'text-blue-700 dark:text-blue-300'
            : 'text-amber-700 dark:text-amber-300';
        return (
          <div key={item.id}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-800 dark:text-slate-100">
                {item.name}{' '}
                <span className="text-xs font-normal text-slate-500">
                  ({item.count} q.)
                </span>
              </span>
              <span className={`font-semibold ${statusTone}`}>
                {item.score}% · {statusLabel}
              </span>
            </div>
            <div
              className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
              role="progressbar"
              aria-valuenow={item.score}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${item.name} : ${item.score}%`}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${item.score}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
