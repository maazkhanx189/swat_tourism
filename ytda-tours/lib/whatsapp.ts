export const WHATSAPP_NUMBER = "923000000000";
// Replace the number above with the company WhatsApp number before launch.

export function buildWhatsAppUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
