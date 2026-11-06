// ============================================================
//  यहां से पूरी वेबसाइट को अपने हिसाब से बदलें
// ============================================================
export const config = {
  // परिवार का नाम (पूरी वेबसाइट में यही दिखेगा)
  familyName: 'गुप्ता परिवार',

  // वेबसाइट डिप्लॉय होने के बाद यहां असली लिंक डालें, जैसे 'https://gupta-diwali.netlify.app'
  // खाली छोड़ने पर वेबसाइट अपना मौजूदा लिंक अपने आप इस्तेमाल करेगी।
  siteUrl: '',

  // Family photo shown in the "परिवार की ओर से" section (the gallery section is removed)
  photos: [
    { src: './photos/memory-1.jpg', caption: 'मेहंदी की प्यारी शाम 💛', ratio: '3 / 2' },
  ],
}

export const siteUrl = () =>
  (config.siteUrl && config.siteUrl.trim()) ||
  (typeof window !== 'undefined' ? window.location.href.split('#')[0] : '')
