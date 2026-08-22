// components/MoviePlayer/MoviePlayer.tsx
import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Hls from 'hls.js'
import { ShowService } from '../services/ShowService'
import { Loading } from '../components/Loading'
import type { Movie } from '../types/Movie'
import '../styles/ViewMovieStyle.css'

const movieService = new ShowService();

export const MoviePlayer = () => {
    const { id } = useParams<{ id: string }>();

    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [movie, setMovie] = useState<Movie | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleGoback = () => {
        navigate(-1);
    }

    // 1. Obtener info de la película (incluye la url del .m3u8)
    useEffect(() => {
        let isMounted = true;

        if (!id) {
            setError('ID de película no proporcionado');
            setIsLoading(false);
            return;
        }

        const fetchMovie = async () => {
            try {
                
                const data = await movieService.getMovieById(id);
                if (isMounted) setMovie(data);
                
            } catch (err) {
                if (isMounted) setError('No se pudo cargar la película');
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchMovie();

        return () => { isMounted = false; };
    }, [id]);

    // 2. Inicializar HLS cuando ya tenemos la url del stream
    useEffect(() => {
    if (!movie?.urlMedia || !videoRef.current) return;

    const video = videoRef.current;

    if (Hls.isSupported()) {
        const hls = new Hls({
            maxBufferLength: 30,
            maxMaxBufferLength: 600,
        });
        hlsRef.current = hls;

        hls.loadSource(movie.urlMedia);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (_event, data) => {
            console.log('HLS Error:', data.type, data.details, data);
            if (data.fatal) setError('Error al reproducir el video');
        });

        // 🔍 Frames perdidos - correlaciona con lo que ves visualmente
        const frameCheckInterval = setInterval(() => {
            if (video && 'getVideoPlaybackQuality' in video) {
                const quality = (video as any).getVideoPlaybackQuality();
                if (quality.droppedVideoFrames > 0) {
                    console.log(
                        `🎞️ Frames perdidos: ${quality.droppedVideoFrames} / ${quality.totalVideoFrames}`
                    );
                }
            }
        }, 3000);

        return () => {
            hls.destroy();
            hlsRef.current = null;
            clearInterval(frameCheckInterval);
        };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = movie.urlMedia;
    } else {
        setError('Tu navegador no soporta la reproducción de este video');
        
    }
}, [movie?.urlMedia]);

    if (isLoading) return <Loading message="Cargando película..." />;
    if (error) {
        return <p className="error">{error}</p>
    };
    if (!movie) return null;

    return (
    <>
        
        <div className="movie-player-container">
            
        
            <button className='button-go-back' onClick={handleGoback} aria-label='Volver'>←</button>
            
            
            <video
                ref={videoRef}
                controls
                autoPlay
                className="movie-video"
            />

            <div className="movie-info">
                <h1 className="movie-title">{movie.title}</h1>

                <ul className="movie-categories">
                    {movie.categories.map((category) => (
                        <li key={category.id} className="category-chip">
                            {category.name}
                        </li>
                    ))}
                </ul>

                <p className="movie-description">{movie.description}</p>
            </div>
        </div>
    </>
       
    );
}