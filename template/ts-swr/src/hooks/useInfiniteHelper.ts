import { useCallback, useEffect, useState } from 'react';

import { SWRInfiniteResponse } from 'swr/infinite';

export default function useInfiniteHelper<T, E = any>(result: SWRInfiniteResponse<T[], E>, pageSize: number) {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isReachingEndData, setIsReachingEndData] = useState<boolean>();

  const handleMoreRead = useCallback(async () => {
    if (!isReachingEndData) {
      result.setSize((prevSize) => prevSize + 1);
    }
  }, [isReachingEndData, result]);

  useEffect(() => {
    const isLoadingInitialData = !result.data && !result.error;
    const isEmpty = result.data?.[0]?.length === 0;

    setIsLoading(
      isLoadingInitialData || (result.size > 0 && result.data && typeof result.data[result.size - 1] === 'undefined'),
    );
    setIsReachingEndData(
      isEmpty || (result.data && result.data?.[result.data?.length - 1]?.length < pageSize) || false,
    );
  }, [pageSize, result]);

  return { ...result, isLoading, isReachingEndData, handleMoreRead };
}
