import { Pokemon } from '@/modules/pokemon/@types';

interface Props {
  data: Pokemon;
}

const PokemonCard = ({ data }: Props) => {
  return (
    <div style={{ border: '1px solid', width: 300, height: 250 }}>
      <span>{data.name}</span>
      <img
        width={200}
        height={200}
        src={`https://img.pokemondb.net/artwork/large/${data.name}.jpg`}
        alt={`${data.name}-이미지`}
      />
    </div>
  );
};

export default PokemonCard;
