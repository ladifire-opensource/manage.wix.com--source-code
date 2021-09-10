import axios from 'axios'

export async function getTranslations (locale, baseUrl) {
  const response = await axios.get(`${baseUrl}assets/locale/messages_${locale}.json`)
  return response.data
}
