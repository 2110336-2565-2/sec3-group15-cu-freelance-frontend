export const fadeIn = (direction, delay) => {
    return {
        hidden: {
            opacity:0,
            y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
            x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 1,
                delay: delay,
                ease: [.25, .25, .25, .75],
            }
        }
    }
};
