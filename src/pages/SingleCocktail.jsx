import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Loading from "../components/Loading";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [singleCocktail, setSingleCocktail] = useState(null);

  const getSingleCocktail = useCallback(async () => {
    try {
      const response = await fetch(url + id);
      const data = await response.json();
      if (data.drinks) {
        const {
          strDrink: name,
          StrCategory: category,
          strAlcoholic: info,
          strGlass: glass,
          strInstructions: instructions,
          strDrinkThumb: image,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        } = data.drinks[0];
        const ingredients = [
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
        ];
        const newCocktail = {
          name,
          category,
          info,
          glass,
          instructions,
          image,
          ingredients,
        };
        setSingleCocktail(newCocktail);
      } else {
        setSingleCocktail([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  }, [id]);
  useEffect(() => {
    getSingleCocktail();
  }, [getSingleCocktail, id]);

  if (loading) {
    return <Loading />;
  }

  if (!singleCocktail) {
    return <h2 className="section-title">no cocktail is there to display</h2>;
  }

  const { name, category, info, glass, instructions, image, ingredients } =
    singleCocktail;

  return (
    <div>
      <section className="section cocktail-section">
        <Link to="/" className="btn btn-primary">
          back home
        </Link>
        <h2 className="section-title">{name}</h2>
        <div className="drink">
          <img src={image} alt={name} />
          <div className="drink-info">
            <p>
              <span className="drink-data">name :</span>
              {name}
            </p>
            <p>
              <span className="drink-data">category :</span>
              {category}
            </p>
            <p>
              <span className="drink-data">info :</span>
              {info}
            </p>
            <p>
              <span className="drink-data">glass :</span>
              {glass}
            </p>
            <p>
              <span className="drink-data">instructions :</span>
              {instructions}
            </p>
            <p>
              <span className="drink-data">ingredients : </span>
              {ingredients.map((item, index) => {
                return item ? <span key={index}> {item}</span> : null;
              })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleCocktail;
