import AnimeCard from './AnimeCard';

const BrowseGrid = ({ items }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {items.map((item) => (
        <AnimeCard key={item.id} title={item.title} subtitle={item.subtitle || item.chapter} />
      ))}
    </div>
  );
};

export default BrowseGrid;
