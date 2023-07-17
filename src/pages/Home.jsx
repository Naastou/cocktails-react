import { useState, useEffect, useCallback } from "react";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const Home = () => {
  const [cocktails, setCocktails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const getCocktails = useCallback(async () => {
    try {
      const response = await fetch(url + searchTerm);
      const { drinks } = await response.json();
      if (drinks) {
        setCocktails(drinks);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);
  useEffect(() => {
    getCocktails();
  }, [getCocktails, searchTerm]);

  return (
    <main>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CocktailList loading={loading} cocktails={cocktails} />
    </main>
  );
};

export default Home;
