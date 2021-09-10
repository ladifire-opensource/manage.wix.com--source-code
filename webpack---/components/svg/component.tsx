import React, { useEffect, useState } from 'react';
import { fetchSVGAsset, Color } from '../../utils/svg-asset-fetcher';

export interface SVGAssetProps {
  src: string;
  className: string;
  dataHook: string;
  fillColor?: Color;
}

export function SVGAsset({ src, dataHook, className, fillColor }: SVGAssetProps) {
  const [imageData, setImageData] = useState<string>(null);

  useEffect(() => {
    fetchSVGAsset(src, fillColor).then(setImageData);
  }, [src, fillColor]);

  return <img data-hook={dataHook} className={className} src={imageData || src} />;
}
