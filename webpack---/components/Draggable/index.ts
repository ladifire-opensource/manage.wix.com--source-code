import { getMaxXY, getRect, h, isElement, moveTo } from '../../util';
import { fixerStyle } from './styles';

type IDraggable = (options: {
  source: HTMLElement;
  target: Element[];
  dragEnd?: (rect: DOMRect) => void;
  dragStart?: () => void;
}) => (rect: { bottom: number; right: number }) => void;

const PADDING = 15;
const dataAttr = 'data-draggable';
const fixer = document.body.appendChild(h('div'));
const noop = () => {};

const isDraggable = ({ target }: Event) => {
  return isElement(target) && target.hasAttribute(dataAttr);
};

export const setDraggable: IDraggable = ({
  source,
  target,
  dragEnd = noop,
  dragStart = noop,
}) => {
  let X: number = 0;
  let Y: number = 0;

  let maxX: number = 0;
  let maxY: number = 0;

  let step: number;

  const calcLeft = (left: number): number => {
    const x = Math.round(left - X);

    if (x < PADDING) {
      return PADDING;
    }
    if (x > maxX) {
      return maxX;
    }

    return x;
  };

  const calcTop = (top: number): number => {
    const y = Math.round(top - Y);

    if (y < PADDING) {
      return PADDING;
    }
    if (y > maxY) {
      return maxY;
    }

    return y;
  };

  const move = (event: MouseEvent) => {
    if (event.buttons !== 1) {
      return clean();
    }

    cancelAnimationFrame(step);

    const left = calcLeft(event.clientX);
    const top = calcTop(event.clientY);

    step = requestAnimationFrame(() => {
      h(source, {
        style: {
          left: `${left}px`,
          top: `${top}px`,
          bottom: 'auto',
          right: 'auto',
        },
      });
    });
  };

  const clean = () => {
    fixer.style.cssText = '';
    fixer.removeEventListener('mousemove', move);
    fixer.removeEventListener('mouseup', clean);
    dragEnd(getRect(source));
  };

  source.addEventListener('mousedown', (event: MouseEvent) => {
    if (isDraggable(event)) {
      event.stopPropagation();
      event.preventDefault();

      dragStart();

      const rect = getRect(source);

      if (event.target === source) {
        X = event.offsetX;
        Y = event.offsetY;
      } else {
        X = event.clientX - rect.left;
        Y = event.clientY - rect.top;
      }

      [maxX, maxY] = getMaxXY(rect, PADDING);

      fixer.style.cssText = fixerStyle;
      fixer.addEventListener('mousemove', move);
      fixer.addEventListener('mouseup', clean);
    }
  });

  target.forEach((i) => {
    i.setAttribute(dataAttr, '');
  });

  return ({ bottom, right }) => {
    step = moveTo({
      bottom,
      right,
      source,
      padding: PADDING,
    });
  };
};
