import { motion } from 'framer-motion'

/**
 * BoutonPrincipal — bouton rose animé principal de Studio Étoile
 * Props:
 *   onClick  : fonction
 *   disabled : bool
 *   variante : 'principal' | 'secondaire' | 'danger' | 'ghost'
 *   taille   : 'sm' | 'md' | 'lg'
 *   children : contenu du bouton
 */
export default function BoutonPrincipal({
  onClick,
  disabled = false,
  variante = 'principal',
  taille = 'md',
  className = '',
  children,
}) {
  const styles = {
    principal:  'bg-rose text-white shadow-rose-glow hover:bg-rose-dark',
    secondaire: 'bg-perle text-lavande-dark border-2 border-lavande hover:bg-lavande hover:text-white',
    danger:     'bg-corail text-white hover:bg-corail-dark',
    ghost:      'bg-transparent text-rose hover:bg-rose-light border-2 border-rose',
  }

  const tailles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  }

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        font-nunito font-bold rounded-2xl transition-colors duration-200
        ${styles[variante]}
        ${tailles[taille]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
