export async function getTranslations(
  locale: string,
  baseUrl: string
): Promise<{ [key: string]: string }> {
  return fetch(`${baseUrl}assets/locale/messages_${locale}.json`).then(r => r.json());
}