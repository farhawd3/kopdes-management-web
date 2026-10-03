import type { ReactNode } from 'react';

export function Field({ id, label, helper, error, children }: {
  id: string; label: string; helper?: string; error?: string; children: ReactNode;
}) {
  return <div className="ui-field">
    <label className="ui-field-label" htmlFor={id}>{label}</label>
    {children}
    {helper && <span id={`${id}-helper`} className="ui-field-helper">{helper}</span>}
    {error && <span id={`${id}-error`} className="ui-field-error" role="alert">{error}</span>}
  </div>;
}
