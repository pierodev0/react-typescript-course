import CryptoPriceDisplay from 'components/CryptoPriceDisplay';
import CryptoSearchForm from 'components/CryptoSearchForm';
import { useEffect } from 'react';
import { useCryptoStore } from 'store';

function App() {
  const { fetchCrypto } = useCryptoStore();

  useEffect(() => {
    fetchCrypto();
  }, []);
  return (
    <>
      <div className='wrapper pt-8'>
        <h1 className='mt-1 text-center text-4xl font-bold text-white'>
          Cotizador de{' '}
          <span className='font-black text-emerald-500'>Cryptomonedas</span>
        </h1>

        <section className='mt-2 rounded-2xl bg-white px-4 py-12 shadow-lg'>
          <CryptoSearchForm />
          <CryptoPriceDisplay />
        </section>
      </div>
    </>
  );
}

export default App;
