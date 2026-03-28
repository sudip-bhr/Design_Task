import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
    threshold = 0.1,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = true,
}: IntersectionObserverOptions = {}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isElementVisible = entry.isIntersecting;
                if (isElementVisible) {
                    setIsVisible(true);
                    if (freezeOnceVisible && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!freezeOnceVisible) {
                    setIsVisible(false);
                }
            },
            { threshold, root, rootMargin }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold, root, rootMargin, freezeOnceVisible]);

    return { ref, isVisible };
}




