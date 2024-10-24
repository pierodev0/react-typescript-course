import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data";
import styles from "./Form.module.css";
import Alert from "../Alert/Alert";

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};
export type SearchType = {
  city: string;
  country: string;
};
function Form({ fetchWeather }: FormProps) {
  const initialSearch: SearchType = {
    city: "",
    country: "",
  };
  const [search, setSearch] = useState(initialSearch);
  const [alert, setAlert] = useState("");

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }

    fetchWeather(search);
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          id="city"
          type="text"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Pais:</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">--Seleccione un pais--</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" value="Consultar clima" className={styles.submit} />
    </form>
  );
}

export default Form;
