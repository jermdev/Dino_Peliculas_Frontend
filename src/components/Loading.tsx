import { useEffect, useState } from 'react'
import '../styles/LoagingStyle.css'

interface LoadingProps {
    message?: string;
}

export const Loading = ({ message = "Cargando..." }: LoadingProps) => {
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="loading-container">
            <div className="spinner" />
            {showMessage && <p className="loading-message">{message}</p>}
        </div>
    );
}