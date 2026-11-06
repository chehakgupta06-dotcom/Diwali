const digits = ['०','१','२','३','४','५','६','७','८','९']
export const toHindiNum = (n) => String(n).replace(/\d/g, (d) => digits[d])
export const months = ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून','जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर']
export const days = ['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार']
// हर तारीख के लिए एक ही संदेश – तारीख से सूची की जगह तय होती है
export const dayIndex = (d = new Date()) => Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000)
export const shuffle = (arr) => { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] } return a }
export const pick = (arr, not) => { let x; do { x = arr[Math.floor(Math.random() * arr.length)] } while (arr.length > 1 && x === not); return x }
