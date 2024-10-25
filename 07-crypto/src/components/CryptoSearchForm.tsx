import Alert from 'components/Alert';
import { currencies } from 'data';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useCryptoStore } from 'store';
import { Pair } from 'types';

function CryptoSearchForm() {
  const { cryptoCurrencies, fetchData } = useCryptoStore();
  const initialPair: Pair = {
    currency: '',
    cryptocurrency: '',
  };
  const [pair, setPair] = useState(initialPair);
  const [error, setError] = useState('');

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setPair({
      ...pair,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (Object.values(pair).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }

    //Consultar la API
    setError('');
    fetchData(pair);
  }
  return (
    <form
      className='flex flex-col gap-4'
      onSubmit={handleSubmit}
    >
      {error && <Alert>{error}</Alert>}
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='currency'
          className='text-gray-900'
        >
          Moneda:{' '}
        </label>
        <select
          name='currency'
          id='currency'
          className='bg-gray-300 p-4 text-xl'
          onChange={handleChange}
          value={pair.currency}
        >
          <option value=''>--Seleccione--</option>
          {currencies.map((currency) => (
            <option
              key={currency.code}
              value={currency.code}
            >
              {currency.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor='cryptocurrency'>Moneda: </label>
        <select
          name='cryptocurrency'
          id='cryptocurrency'
          className='bg-gray-300 p-4 text-xl'
          onChange={handleChange}
          value={pair.cryptocurrency}
        >
          <option value=''>--Seleccione--</option>
          {cryptoCurrencies.map((crypto) => (
            <option
              key={crypto.CoinInfo.Name}
              value={crypto.CoinInfo.Name}
            >
              {crypto.CoinInfo.FullName}
            </option>
          ))}
        </select>
      </div>
      <input
        type='submit'
        value='Cotizar'
        className='cursor-pointer bg-emerald-500 p-4 font-bold uppercase text-white transition hover:bg-emerald-600'
      />
    </form>
  );
}

export default CryptoSearchForm;
