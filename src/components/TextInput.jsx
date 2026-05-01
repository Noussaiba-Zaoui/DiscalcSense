export function TextInput({ label, ...props }) {
  return (
    <label className="text-input-label">
      <span>{label}</span>
      <input className="text-input" {...props} />
    </label>
  );
}
