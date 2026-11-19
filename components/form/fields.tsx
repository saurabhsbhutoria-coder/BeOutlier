import type { ReactNode } from "react";

const inputBase =
  "block w-full min-h-12 rounded-[10px] border-2 bg-offwhite px-4 text-base text-navy placeholder:text-navy-muted/70 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-mint/60";

function borderFor(error?: string) {
  return error ? "border-coral-deep" : "border-navy";
}

function Shell({
  id,
  label,
  hint,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-navy">
        {label}
        {optional ? <span className="ml-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-navy-muted">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-sm text-navy-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-sm font-semibold text-coral-deep">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0">
            <circle cx="8" cy="8" r="7" fill="currentColor" />
            <path d="M8 4v5M8 11.2v.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export function TextField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  optional,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  maxLength,
  prefix,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  hint?: string;
  optional?: boolean;
  type?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  placeholder?: string;
  maxLength?: number;
  prefix?: string;
}) {
  const input = (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      autoComplete={autoComplete}
      inputMode={inputMode}
      placeholder={placeholder}
      maxLength={maxLength}
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy(id, hint, error)}
      className={`${inputBase} ${borderFor(error)} ${prefix ? "rounded-l-none border-l-0" : ""}`}
    />
  );
  return (
    <Shell id={id} label={label} hint={hint} error={error} optional={optional}>
      {prefix ? (
        <div className="flex">
          <span
            className={`inline-flex min-h-12 items-center rounded-l-[10px] border-2 bg-stone px-3 font-mono text-base font-bold ${borderFor(error)}`}
            aria-hidden="true"
          >
            {prefix}
          </span>
          {input}
        </div>
      ) : (
        input
      )}
    </Shell>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  onBlur,
  options,
  error,
  hint,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  options: string[];
  error?: string;
  hint?: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <Shell id={id} label={label} hint={hint} error={error}>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          className={`${inputBase} ${borderFor(error)} appearance-none pr-10`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className="pointer-events-none absolute top-1/2 right-4 h-2 w-3 -translate-y-1/2"
        >
          <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
    </Shell>
  );
}

export function CheckboxField({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-start gap-3 rounded-[10px] border-2 bg-stone p-4 ${borderFor(error)}`}
      >
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-6 shrink-0 accent-navy"
        />
        <span className="text-sm leading-snug font-semibold text-navy">{children}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="text-sm font-semibold text-coral-deep">
          {error}
        </p>
      ) : null}
    </div>
  );
}
