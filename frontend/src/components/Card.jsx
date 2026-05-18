export default function Card({ children, className = '' }) {
  return (
    <div className={`glass rounded-2xl p-6 hover-glow transition-all duration-300 ${className}`}>
      {children}
    </div>
  )
}
