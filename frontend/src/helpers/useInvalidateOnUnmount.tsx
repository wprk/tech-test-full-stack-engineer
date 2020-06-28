import { useEffect } from 'react'
import { Schema, ReadShape, useInvalidator } from 'rest-hooks';

export function useInvalidateOnUnmount<
  Params extends Readonly<object>,
  S extends Schema
>(fetchShape: ReadShape<S, Params>, params: Params | null) {
  const invalidate = useInvalidator(fetchShape);

  useEffect(() => {
    return () => invalidate(params);
  }, [invalidate, params]);
}