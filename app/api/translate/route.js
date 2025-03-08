// app/api/translate/route.js
export async function POST(req) {
    const { text } = await req.json();

    if (!text) {
        return new Response(JSON.stringify({ error: 'Text is required' }), { status: 400 });
    }

    const languages = {
        'Chinese-simplified': 'zh-CN',
        'Chinese-traditional': 'zh-TW',
        German: 'de-DE',
        Spanish: 'es-ES',
        French: 'fr-FR',
        English: 'en-US',
        Swedish: 'sv-SE',
    };

    try {
        const translations = {};

        for (const [language, code] of Object.entries(languages)) {
            const response = await fetch(
                `https://translate.google.com/translate_a/single?client=gtx&sl=en&tl=${code}&dt=t&q=${encodeURIComponent(
                    text
                )}`
            );
            const data = await response.json();

            translations[language] = data[0][0][0];
        }

        return new Response(JSON.stringify({ translations }), { status: 200 });
    } catch (error) {
        console.error('Error during translation:', error);
        return new Response(JSON.stringify({ error: 'Failed to translate text' }), { status: 500 });
    }
}
