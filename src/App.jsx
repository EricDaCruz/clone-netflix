import { useEffect, useState } from 'react';
/* Services */
import Tmdb from './services/Tmdb'
import './App.css'
/* Components */
import MovieRow from './components/MovieRow';
import FeaturedMovies from './components/FeaturedMovies';
import Header from './components/Header';

const App = () => {

  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

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
  useEffect (() => {
    const scrollListener = () =>{
      if(window.scrollY > 50){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  },[])

  return ( 
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData && 
        <FeaturedMovies item={featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="http://cdn.shopify.com/s/files/1/0131/9233/1328/products/love-netflix_1200x1200.gif?v=1602081497" alt="Carregando" />
        </div>
      }
    </div>
   );
}
 
export default App;