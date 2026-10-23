import { useRef, type DragEvent } from "react";
import type { ReactNode, PointerEvent, MouseEvent } from "react";


interface ReelProps {
    children: ReactNode;
    className?: string;
}

interface DragState {
    active: boolean;
    startX: number;
    scrollLeft: number;
    moved: boolean;
}

export default function Reel({ children, className = "" }: ReelProps) {
    const ref = useRef<HTMLDivElement>(null);
    const drag = useRef<DragState>({
        active: false,
        startX: 0,
        scrollLeft: 0,
        moved: false,
    });

    const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el || e.pointerType === "touch") return; // el touch ya funciona nativo

        e.preventDefault();

        drag.current = {
            active: true,
            startX: e.clientX,
            scrollLeft: el.scrollLeft,
            moved: false,
        };
        el.setPointerCapture(e.pointerId);
        el.classList.add("dragging");
    };

    const onDragStart = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el || !drag.current.active) return;

        const dx = e.clientX - drag.current.startX;
        if (Math.abs(dx) > 5) drag.current.moved = true;
        el.scrollLeft = drag.current.scrollLeft - dx;
    };

    const endDrag = () => {
        drag.current.active = false;
        ref.current?.classList.remove("dragging");
    };

    // Evita que se dispare un click en una card después de arrastrar
    const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
        if (drag.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            drag.current.moved = false;
        }
    };

    return (
        <div
            ref={ref}
            className={`reel ${className}`.trim()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClickCapture={onClickCapture}
            onDragStart={onDragStart}
        >
            {children}
        </div>
    );
}