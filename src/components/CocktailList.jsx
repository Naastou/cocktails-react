import Cocktail from "../components/Cocktail";
import Loading from "../components/Loading";

const CocktailList = ({ cocktails, loading }) => {
  if (loading) {
    return <Loading />;
  }
  if (!cocktails.length) {
    return (
      <h2 className="section-title">
        no cocktails matched your search criteria
      </h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((cocktail, id) => {
          return <Cocktail key={id} cocktail={cocktail} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
