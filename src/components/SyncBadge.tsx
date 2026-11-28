import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  DownloadCloud,
  WifiOff,
} from 'lucide-react';
import { SyncStatus } from '../types';

interface SyncBadgeProps {
  status: SyncStatus;
  pendingCount?: number;
  onClick?: () => void;
  compact?: boolean;
}

const CONFIG: Record<
  SyncStatus,
  {
    label: string;
    shortLabel: string;
    classes: string;
    Icon: React.FC<{ className?: string }>;
  }
> = {
  synced: {
    label: 'Synchronisé',
    shortLabel: 'Sync OK',
    classes:
      'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800',
    Icon: CheckCircle2,
  },
  pending: {
    label: 'En attente de synchronisation',
    shortLabel: 'En attente',
    classes:
      'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800',
    Icon: Clock,
  },
  downloading: {
    label: 'Téléchargement en cours',
    shortLabel: 'Téléchargement...',
    classes:
      'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/60 dark:text-blue-200 dark:border-blue-800',
    Icon: DownloadCloud,
  },
  offline: {
    label: 'Mode hors ligne',
    shortLabel: 'Hors ligne',
    classes:
      'bg-slate-800 text-white border-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:border-slate-300',
    Icon: WifiOff,
  },
  error: {
    label: 'Erreur de synchronisation',
    shortLabel: 'Erreur sync',
    classes:
      'bg-red-50 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-200 dark:border-red-800',
    Icon: AlertTriangle,
  },
};

export const SyncBadge: React.FC<SyncBadgeProps> = ({
  status,
  pendingCount = 0,
  onClick,
  compact = false,
}) => {
  const { label, shortLabel, classes, Icon } = CONFIG[status];
  const displayLabel =
    status === 'pending' && pendingCount > 0
      ? `${compact ? shortLabel : label} (${pendingCount})`
      : compact
      ? shortLabel
      : label;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:opacity-90 ${classes}`}
      title={label}
      aria-label={`État de synchronisation : ${label}`}
    >
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate">{displayLabel}</span>
    </button>
  );
};
