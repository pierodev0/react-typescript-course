import { fetchCurrencyCryptoPrices, getCryptos } from 'services/CryptoService';
import { CryptoCurrency, CryptoPrice, Pair } from 'types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type CryptoStore = {
  cryptoCurrencies: CryptoCurrency[];
  result: CryptoPrice;
  loading: boolean;
  fetchCrypto: () => Promise<void>;
  fetchData: (pair: Pair) => Promise<void>;
};
export const useCryptoStore = create<CryptoStore>()(
  devtools((set) => ({
    cryptoCurrencies: [],
    result: {
      IMAGEURL: '',
      PRICE: '',
      HIGHDAY: '',
      LOWDAY: '',
      CHANGEPCT24HOUR: '',
      LASTUPDATE: '',
    },
    loading: false,
    fetchCrypto: async () => {
      const cryptoCurrencies = await getCryptos();
      set(() => ({
        cryptoCurrencies,
      }));
    },

    fetchData: async (pair) => {
      set(() => ({
        loading: true,
      }));
      const result = await fetchCurrencyCryptoPrices(pair);
      set(() => ({
        result,
        loading: false,
      }));
    },
  })),
);
