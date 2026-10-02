'use client';
import Link from 'next/link';
import { type ReactNode } from 'react';
import { Inbox } from 'lucide-react';

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  tone,
  pastelVariant = 'blue',
  compact = false,
  className = '',
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: ReactNode;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  tone?: 'emerald' | 'blue' | 'amber' | 'purple' | 'rose';
  pastelVariant?: 'emerald' | 'blue' | 'amber' | 'purple' | 'rose';
  compact?: boolean;
  className?: string;
}) {
  const effectiveTone = tone || pastelVariant;
  return (
    <div
      className={`clean-empty-state pastel-${effectiveTone} ${compact ? 'clean-empty-state-compact' : ''} ${className}`}
      role="status"
    >
      <div className="clean-empty-icon-wrap" aria-hidden="true">
        {icon || <Inbox size={22} strokeWidth={2} />}
      </div>
      <h3 className="clean-empty-title">{title}</h3>
      {description && <p className="clean-empty-desc">{description}</p>}
      {(action || secondaryAction) && (
        <div className="clean-empty-actions">
          {action &&
            (action.href ? (
              <Link href={action.href} className="clean-empty-btn-primary">
                {action.icon}
                <span>{action.label}</span>
              </Link>
            ) : (
              <button
                type="button"
                className="clean-empty-btn-primary"
                onClick={action.onClick}
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          {secondaryAction &&
            (secondaryAction.href ? (
              <Link href={secondaryAction.href} className="clean-empty-btn-secondary">
                {secondaryAction.label}
              </Link>
            ) : (
              <button
                type="button"
                className="clean-empty-btn-secondary"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
