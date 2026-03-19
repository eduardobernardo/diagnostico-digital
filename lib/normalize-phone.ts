export function normalizePhone(phone: string): string {
  if (!phone) return "";

  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("55")) return "+" + digits;
  return "+55" + digits;
}
