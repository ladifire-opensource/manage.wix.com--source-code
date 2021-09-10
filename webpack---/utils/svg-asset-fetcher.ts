import axios from 'axios';

interface SVGAssetsCache {
  [assetUrl: string]: {
    [color: string]: Color;
  };
}

export type Color = 'default' | string;

const svgAssetsCache: SVGAssetsCache = {};

export const fetchSVGAsset = async (url: string, color: Color) => {
  try {
    svgAssetsCache[url] = svgAssetsCache[url] || {};
    if (!svgAssetsCache[url][color]) {
      const asset = (await axios.get(url)).data;
      svgAssetsCache[url][color] = recolorSVGAsset(asset, color);
    }
    return svgAssetsCache[url][color];
  } catch (e) {
    return null;
  }
};

const recolorSVGAsset = (assetData: string, color: Color) => {
  const styleElementThatAppliesColor = color !== 'default' ? `<style> * { fill: ${color} !important; } </style>` : '';
  const $ = document.createElement('div');
  $.innerHTML = assetData;
  $.querySelector('svg').innerHTML = `${styleElementThatAppliesColor}\n${$.querySelector('svg').innerHTML}`;
  return `data:image/svg+xml;base64,${btoa($.innerHTML)}`;
};
