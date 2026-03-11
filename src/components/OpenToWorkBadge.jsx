import { motion } from 'framer-motion';

const OpenToWorkBadge = () => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '9999px',
                color: 'var(--color-accent-green)',
                fontSize: '0.85rem',
                fontWeight: 600,
                boxShadow: 'var(--shadow-sm)'
            }}
        >
            <span style={{
                display: 'block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--color-accent-green)',
                boxShadow: '0 0 8px var(--color-accent-green)',
                animation: 'pulse 2s infinite'
            }} />
            Disponible pour de nouvelles missions
        </motion.div>
    );
};

export default OpenToWorkBadge;
