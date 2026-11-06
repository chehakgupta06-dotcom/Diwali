# दीपों का उत्सव 🪔 – परिवार की दीपावली वेबसाइट

React + Vite से बनी, Hindi-first, मोबाइल-पहले डिज़ाइन वाली दीपावली शुभकामना वेबसाइट।

## चलाने का तरीका
```bash
npm install
npm run dev      # कंप्यूटर पर देखने के लिए (http://localhost:5173)
npm run build    # असली वेबसाइट बनाने के लिए → dist/ फोल्डर
```

## 1. परिवार का नाम और लिंक बदलना – `src/config.js`
- `familyName`: 'गुप्ता परिवार' की जगह अपना नाम लिखें, पूरी वेबसाइट में बदल जाएगा।
- `siteUrl`: वेबसाइट अपलोड होने के बाद यहां असली लिंक डालें (जैसे `https://gupta-diwali.netlify.app`)।
  खाली छोड़ने पर वेबसाइट अपना खुला हुआ लिंक खुद इस्तेमाल करती है, इसलिए व्हाट्सऐप में सही लिंक ही जाएगा।
- `photos`: परिवार की फोटो की सूची।

## 2. अपनी फोटो लगाना
1. फोटो `public/photos/` में रखें।
2. `src/config.js` की `photos` सूची में `src`, `caption` और `ratio` बदलें (`ratio` जैसे `'16 / 9'`, `'1 / 1'`, `'3 / 4'`)।

- `placeholder-1.svg` और `placeholder-2.svg` सिर्फ जगह भरने के लिए हैं। इन्हें अपनी फोटो से बदल दीजिए।
- "परिवार की ओर से संदेश" वाले हिस्से में `photos[0]` दिखती है।

## 3. मुफ्त में ऑनलाइन डालना (लिंक पाने के लिए)
सबसे आसान: **Netlify Drop** (https://app.netlify.com/drop)
1. `npm run build` चलाइए।
2. बने हुए `dist` फोल्डर को Netlify Drop पर खींचकर छोड़ दीजिए।
3. मिला हुआ लिंक `src/config.js` के `siteUrl` में डालिए, फिर `npm run build` करके `dist` दोबारा अपलोड कीजिए।
Vercel या GitHub Pages पर भी यही `dist` चलता है (`base: './'` रखा गया है)।

## 4. शुभकामना दीवार – ज़रूरी बात
- **बिना डेटाबेस (अभी की स्थिति):** लिखे हुए संदेश `localStorage` में सिर्फ उसी व्यक्ति के फोन/ब्राउज़र में सेव होते हैं।
  **दूसरे लोगों को वे नहीं दिखेंगे।** वेबसाइट पर यह बात हिंदी में साफ लिखी दिखती है।
- **सबके लिए साझा दीवार (Supabase, मुफ्त):**
  1. https://supabase.com पर प्रोजेक्ट बनाइए।
  2. `supabase-setup.sql` को SQL Editor में चलाइए।
  3. `.env.example` को `.env` नाम से कॉपी करके `VITE_SUPABASE_URL` और `VITE_SUPABASE_ANON_KEY` भरिए
     (Project Settings → API)।
  4. `npm run build` करके दोबारा अपलोड कीजिए।
  Netlify/Vercel पर बनाते हैं तो यही दोनों वैल्यू वहां की Environment Variables में डालिए।
  इसके बाद दीवार अपने आप साझा हो जाएगी और कोड में कोई बदलाव नहीं करना होगा।
  ध्यान रहे: कोई भी लिंक वाला व्यक्ति संदेश लिख सकेगा। गलत संदेश Supabase की Table Editor से हटा सकते हैं।

## 5. Music
Put your Happy Diwali song at `public/music/happy-diwali.mp3` (exact name). It plays only when the visitor taps the music button. If the file is missing, a soft built-in tune plays instead.

## 6. फोल्डर की बनावट
```
src/
  config.js            परिवार का नाम, लिंक, फोटो
  data/wishes.js       सारी शुभकामनाएं, संदेश, पहिए के आशीर्वाद, मिठाई के संदेश
  components/          हर सेक्शन की अलग फाइल (Hero, DiyaLighting, Rangoli, SpinWheel, Fireworks ...)
  hooks/useMusic.js    संगीत
  services/wishStore.js  दीवार का स्टोरेज (localStorage या Supabase)
  utils/               व्हाट्सऐप शेयर, हिंदी तारीख/अंक
  styles/global.css    पूरा डिज़ाइन
```
कार्ड बनाने वाला हिस्सा Google Fonts (Noto Sans Devanagari और Yatra One) इस्तेमाल करता है, इसलिए पहली बार खुलने पर इंटरनेट चाहिए।
