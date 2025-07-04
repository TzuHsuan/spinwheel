
type direction = 'left' | 'right';


export const Chevron = ({ direction = 'left', color = 'black', className }: { direction?: direction, color: string, className: string }) => {
	return (
		<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ transform: `rotate(${direction === 'left' ? 0 : 180}deg)` }}>
			<path d="M15 6L9 12L15 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}
