export default function Input({
  label,
  name,
  className = "",
  ...props
}) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="field-label">
          {label}
        </label>
      )}
      <input id={name} name={name} className={className} {...props} />
    </div>
  );
}
