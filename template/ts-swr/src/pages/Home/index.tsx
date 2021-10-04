import { useCallback, useState } from 'react';

import PokemonCard from '@/components/PokemonCard';
import { useListReadPokemon } from '@/modules/pokemon';

const DEFAULT_PAGE_SIZE = 10;

const Home = () => {
  const [offset, setOffset] = useState(0);
  const {
    data: pokemonListData,
    error: pokemonListError,
    totalCount,
    isValidating,
  } = useListReadPokemon({ offset, limit: DEFAULT_PAGE_SIZE });

  const handleChangePrevOffset = useCallback(() => {
    setOffset((prevOffset) => prevOffset - DEFAULT_PAGE_SIZE);
  }, []);

  const handleChangeNextOffset = useCallback(() => {
    setOffset((prevOffset) => prevOffset + DEFAULT_PAGE_SIZE);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <h1>Pokemon</h1>
      <span>총 {!isValidating ? totalCount : '...'}건 검색</span>
      {isValidating && <span>Loading....</span>}
      {!pokemonListError && pokemonListData?.map((pokemon) => <PokemonCard key={pokemon.name} data={pokemon} />)}
      {!isValidating && !pokemonListError && !pokemonListData?.length && <div>검색한 내역이 없습니다.</div>}
      {pokemonListError && <span>Error...</span>}
      <div style={{ display: 'flex', marginTop: 10 }}>
        <button type="button" onClick={handleChangePrevOffset} disabled={offset === 0}>
          prev
        </button>
        <button type="button" onClick={handleChangeNextOffset}>
          next
        </button>
      </div>
    </div>
  );
};

export default Home;
