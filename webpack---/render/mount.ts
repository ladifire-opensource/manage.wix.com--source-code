export const mount = (nodes: (HTMLElement | undefined)[]) => {
  nodes
    .filter(Boolean)
    .forEach((node) => document.body.appendChild(node as HTMLElement));
};
