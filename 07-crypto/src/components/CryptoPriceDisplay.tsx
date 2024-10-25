import Spinner from 'components/Spinner';
import { useMemo } from 'react';
import { useCryptoStore } from 'store';

function CryptoPriceDisplay() {
  const { result, loading } = useCryptoStore();
  const hasResult = useMemo(
    () => !Object.values(result).includes(''),
    [result],
  );
  return (
    <div className='mt-20'>
      {loading ? (
        <Spinner />
      ) : (
        hasResult && (
          <>
            <h2 className='text-center font-bold'>Cotizacion</h2>
            <div className='grid grid-cols-[1fr_3fr] items-center gap-1'>
              <img
                src={`https://cryptocompare.com${result.IMAGEURL}`}
                alt='Imagen Cryptomoneda'
                className='w-full'
              />
              <div className='py-2 text-2xl [&_span]:font-bold [&_span]:text-emerald-500'>
                <p>
                  El precio es de: <span>{result.PRICE}</span>
                </p>
                <p>
                  El precio mas alto del dia: <span>{result.HIGHDAY}</span>
                </p>
                <p>
                  El precio mas bajo del dia: <span>{result.LOWDAY}</span>
                </p>
                <p>
                  La variacion en 24hs : <span>{result.CHANGEPCT24HOUR}%</span>
                </p>

                <p>
                  Ultima actualizacion : <span>{result.LASTUPDATE}</span>
                </p>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default CryptoPriceDisplay;
