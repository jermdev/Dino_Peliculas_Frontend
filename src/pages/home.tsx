import { useEffect, useState } from 'react'
import { SectionHome } from '../components/sectionHome'
import { ShowService } from '../services/ShowService'
import type { HomeFeed } from '../types/HomeFeed';


export const Home = () => {
    const showService = new ShowService();
    
    const [sections, setSections] = useState<HomeFeed>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        let isMounted = true;
        const fecthHomeData = async () => {
         try {
                const data = await showService.buildPage();
                console.log(data);
                
                if (isMounted) setSections(data);
            } catch (err) {
                    if (isMounted) setError('Error al cargar las películas');
                    console.log("hola");

            } finally {
                    if (isMounted) setIsLoading(false);
            }
        }

        fecthHomeData();

         return () => {
                isMounted = false; // cleanup
        };
    }, [])
   
    if (isLoading) return <p className="loading">Cargando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (<>
        {
            sections?.sections.map((section)=>(
                 <SectionHome key={section.title} section={section} />
            ))
        }
    </>)
}