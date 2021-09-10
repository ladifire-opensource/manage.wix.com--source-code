import { runCallback } from '../utils/callbackUtils';

function embedScript(
  sourceUrl: string,
  onload: Function,
  onerror: Function,
  attributes?: any,
) {
  const script: any = document.createElement('SCRIPT');
  script.src = sourceUrl;
  script.onload = () => {
    runCallback(onload, sourceUrl);
  };
  script.onerror = (err: any) => {
    runCallback(onerror, { error: err, sourceUrl });
  };
  if (typeof attributes === 'object') {
    Object.keys(attributes).forEach((attributeKey: string) => {
      script.setAttribute(attributeKey, attributes[attributeKey]);
    });
  }
  document.head.appendChild(script);
}

export { embedScript };
