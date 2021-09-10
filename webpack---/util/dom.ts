import { h } from './h';

export const getRect = (source: HTMLElement): DOMRect =>
  source.getBoundingClientRect();

export const getMaxXY = (rect: DOMRect, padding: number) => [
  window.innerWidth - (rect.width + padding),
  window.innerHeight - (rect.height + padding),
];

export type MoveToParams = {
  bottom: number;
  right: number;
  padding: number;
  source: HTMLElement;
};

export const moveTo = ({ bottom, right, source, padding }: MoveToParams) => {
  return requestAnimationFrame(() => {
    const rect = getRect(source);
    const [maxRight, maxBottom] = getMaxXY(rect, padding);

    const x1 = right - rect.width;
    const y1 = bottom - rect.height;

    const left = x1 > maxRight ? maxRight : x1;
    const top = y1 > maxBottom ? maxBottom : y1;

    h(source, {
      style: {
        left: `${left > padding ? left : padding}px`,
        top: `${top > padding ? top : padding}px`,
        bottom: 'auto',
        right: 'auto',
      },
    });
  });
};
