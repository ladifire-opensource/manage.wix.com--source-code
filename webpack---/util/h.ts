type M = HTMLElementTagNameMap;

type TProps<T extends keyof M> = Omit<M[T], 'style'> & {
  readonly cssText: string;
  readonly style: Partial<CSSStyleDeclaration>;
  readonly role: string;
  readonly [key: string]: unknown;
};

export const isHTMLElement = (val: unknown): val is HTMLElement => {
  return val instanceof HTMLElement;
};

export const h = <T extends keyof M>(
  tagName: T | M[T],
  props?: Partial<TProps<T>>,
): M[T] => {
  const element = isHTMLElement(tagName)
    ? tagName
    : document.createElement<T>(tagName);

  for (const key in props) {
    const val = props[key];

    if (key === 'style') {
      for (const i in val) {
        (element.style as any)[i] = val[i];
      }
    } else if (key === 'cssText') {
      (element.style as any).cssText = val;
    } else if (key in element) {
      (element as any)[key] = val;
    } else {
      element.setAttribute(key, String(val));
    }
  }

  return element;
};
