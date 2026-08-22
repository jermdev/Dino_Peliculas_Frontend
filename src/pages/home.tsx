import { useEffect, useState } from 'react'

import { SectionHome } from '../components/SectionHome'
import { ShowService } from '../services/ShowService'
import { Loading } from '../components/Loading'
import type { HomeFeed } from '../types/HomeFeed';
import { BarrSearch } from '../components/BarrSearch'

import '../styles/HomeStyle.css'

const showService = new ShowService();
let cachedSections: HomeFeed | undefined = undefined;

export const Home = () => {
    
    const [sections, setSections] = useState<HomeFeed | undefined>(cachedSections);
    const [isLoading, setIsLoading] = useState(!cachedSections);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (cachedSections) return;

        let isMounted = true;
        const fecthHomeData = async () => {
         try {
                const data = await showService.buildPage();
                if (isMounted) {
                    cachedSections = data;
                    setSections(data);
                }
            } catch (err) {
                    if (isMounted) setError('Error al cargar las películas');

            } finally {
                    if (isMounted) setIsLoading(false);
            }
        }

        fecthHomeData();

         return () => { isMounted = false;};
    }, [])
   
    if (isLoading) return <Loading message='La primera carga suele tardar 30 segundos' />;
    if (error) return <p className="error">{error}</p>;

    return (<>
        <div className='search-bar-wrapper'>
            {<BarrSearch />}
        </div>
        {sections?.sections.map((section)=>(
                 <SectionHome key={section.title} section={section} />
            ))}
            
    </>)
}