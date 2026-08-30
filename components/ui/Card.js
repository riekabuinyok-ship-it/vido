export default function Card({ title, children, className = "", ...props }) {
  return (
    <div className={className} {...props}>
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
