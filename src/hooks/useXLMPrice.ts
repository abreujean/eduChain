import { useQuery } from '@tanstack/react-query';

interface XLMPriceResponse {
  stellar: {
    brl: number;
  };
}

const fetchXLMPrice = async (): Promise<number> => {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=stellar&vs_currencies=brl'
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch XLM price');
  }
  
  const data: XLMPriceResponse = await response.json();
  return data.stellar.brl;
};

export function useXLMPrice() {
  return useQuery({
    queryKey: ['xlm-price'],
    queryFn: fetchXLMPrice,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}