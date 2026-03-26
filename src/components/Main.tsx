import { useEffect, useState } from "react";
import Card from "./Card";
import './Main.css';
interface Pokemon {
  name: string;
  image: string;
}
function Main() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setStatus('loading');
        const responseList = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
        if (!responseList.ok) throw new Error(`HTTP error! status: ${responseList.status}`);
        const dataList = await responseList.json();
        const detailedPokemons = await Promise.all(
          dataList.results.map(async (p: { url: string }) => {
            const responseDetail = await fetch(p.url);
            if (!responseDetail.ok) throw new Error(`HTTP error! status: ${responseDetail.status}`);
            const dataDetail = await responseDetail.json();
            return {
              name: dataDetail.name,
              image: dataDetail.sprites.front_default,
            };
          })
        );
        setPokemons(detailedPokemons);
        setStatus('success');
      } catch (e: any) {
        setErrorMessage(e.message);
        setStatus('error');
        console.error("Error fetching Pokémon data:", e);
      }
    };
    fetchPokemons();
  }, []);
  if (status === 'loading') {
    return <main className="main">Cargando Pokémon...</main>;
  }
  if (status === 'error') {
    return <main className="main">Error: {errorMessage}. No se pudieron cargar los Pokémon.</main>;
  }
  return (
    <main className="main">
      <h1>Pokémon</h1>
      <div className="pokemon-grid"> 
        {pokemons.map((pokemon) => (
          <Card key={pokemon.name} name={pokemon.name} imageUrl={pokemon.image} />
        ))}
      </div>
    </main>
  );
}
export default Main;