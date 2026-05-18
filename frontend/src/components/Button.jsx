export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2'
  
  const variants = {
    primary: 'bg-primary hover:bg-accent text-text-primary hover-glow',
    secondary: 'bg-dark-card border border-primary text-primary hover:bg-primary hover:text-text-primary',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-text-primary'
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
