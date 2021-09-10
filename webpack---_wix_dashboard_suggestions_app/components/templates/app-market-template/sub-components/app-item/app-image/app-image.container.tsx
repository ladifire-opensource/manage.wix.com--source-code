import React, { FC, useCallback, useState, memo } from 'react';
import { AppImageComponent } from './app-image.component';

export interface AppImageProps {
  src?: string;
}

export const AppImage: FC<AppImageProps> = memo(({ src }) => {
  const [isError, setError] = useState<boolean>(false);

  const onError = useCallback(() => {
    setError(true);
  }, []);

  return <AppImageComponent src={isError ? undefined : src} onError={onError} />;
});
