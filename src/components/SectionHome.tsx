import { Link } from 'react-router-dom'
import type { HomeFeedSection } from '../types/HomeFeedSection'
import '../styles/SetionHomeStyle.css'

export const SectionHome = ({ section }:{section: HomeFeedSection} ) => {

    const { items, title } = section

    return (
    <>
    <section>
        <h3>{title}</h3>
        <div className="movie-row">
                {items.map((movie) => (
                    <article key={movie.id} className="movie-card">
                        <Link 
                            to={`/movie/${movie.id}`} 
                            key={movie.id} 
                            className="movie-card"
                        >
                        <img
                            referrerPolicy="no-referrer"
                            src={movie.urlVerticalPoster}
                            alt={movie.title}
                            decoding="async"
                            loading="lazy"
                        />
                        <p className="movie-title">{movie.title}</p>
                        </Link>
                    </article>
                ))}
            </div>
    </section>
    </>)
}