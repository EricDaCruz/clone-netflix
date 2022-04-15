import { useEffect, useState } from 'react';
/* Services */
import Tmdb from './services/Tmdb'
import './App.css'
/* Components */
import MovieRow from './components/MovieRow';
import FeaturedMovies from './components/FeaturedMovies';

const App = () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect (()=>{
    const loadAll = async () => {
      // Pegar a lista de filmes
      let list = await Tmdb.getHomeList()
      setMovieList(list);
      // Pegar filme em destaque
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo);
    }
  
    loadAll()
  }, [])

  return ( 
    <div className="page">
      {featuredData && 
        <FeaturedMovies item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
   );
}
 
export default App;