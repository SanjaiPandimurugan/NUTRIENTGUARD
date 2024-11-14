const LIBRETRANSLATE_API = 'https://libretranslate.de/translate';

export const translateText = async (text, targetLang) => {
  try {
    const response = await fetch(LIBRETRANSLATE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'auto',
        target: targetLang
      })
    });
    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}; 