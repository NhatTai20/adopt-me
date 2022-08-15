import { useEffect, useState, useContext } from "react";
import { PetAPIResponse, Animal, Pet } from "./APIResponsesType";
import Results from "./Results";
import ThemeContext from "./ThemeContext";
import useBreedList from "./useBreedList";
import { useSelector, useDispatch } from "react-redux";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";
import changeLocation from "./actionCreators/changeLocation";
import { RootState } from "./reducers";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const animal = useSelector((state: RootState) => state.animal);
  const location = useSelector((state: RootState) => state.location);
  const breed = useSelector((state: RootState) => state.breed);
  const dispatch = useDispatch();
  const [pets, setPets] = useState([] as Pet[]);
  const [breeds] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);
  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json() as PetAPIResponse;

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => dispatch(changeLocation(e.target.value))}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              dispatch(changeAnimal(e.target.value as Animal));
            }}
            onBlur={(e) => {
              dispatch(changeAnimal(e.target.value as Animal));
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => dispatch(changeBreed(e.target.value))}
            onBlur={(e) => dispatch(changeBreed(e.target.value))}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select value={theme} onChange={(e)=>{setTheme(e.target.value)}} onBlur={(e)=>{setTheme(e.target.value)}}>
            <option value="peru">Peru</option>
            <option value="darkblue">Dark Blue</option>
            <option value="chartreuse">Chartreuse</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="#F06D06">Fog Dog</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
