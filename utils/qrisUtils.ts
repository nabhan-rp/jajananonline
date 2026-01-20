/**
 * Calculates the CRC16 (CCITT-FALSE) for the QRIS string.
 */
function crc16(data: string): string {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    let x = ((crc >> 8) ^ data.charCodeAt(i)) & 0xff;
    x ^= x >> 4;
    crc = ((crc << 8) ^ (x << 12) ^ (x << 5) ^ x) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Formats a tag value pair for QRIS (Tag + Length + Value).
 */
function formatField(tag: string, value: string): string {
  const length = value.length.toString().padStart(2, '0');
  return `${tag}${length}${value}`;
}

/**
 * Converts a static Qiospay/Nobu QR string into a dynamic one with a specific amount.
 * @param staticQr The original long string provided by Qiospay
 * @param amount The amount to charge (e.g., 10000)
 */
export function generateDynamicQR(staticQr: string, amount: number): string {
  // 1. Remove the existing CRC (Tag 63) at the end.
  // Usually the last 4 chars are the CRC value, and the 4 chars before that are "6304".
  // Or we can just strip everything from "6304" onwards if it exists.
  
  let rawQr = staticQr;
  const crcIndex = rawQr.lastIndexOf('6304');
  if (crcIndex !== -1) {
    rawQr = rawQr.substring(0, crcIndex);
  }

  // 2. Check if Tag 54 (Transaction Amount) exists.
  // If it exists, we must remove it so we can add the new one.
  // A simple approach is searching for "54" followed by length. 
  // However, relying on string replacement is risky if "54" appears elsewhere.
  // For a robust implementation, we would parse all TLVs.
  // For this specific Qiospay format, Tag 54 is usually missing in the static string (000201...), 
  // or we append it before the CRC.
  
  // NOTE: If the static string already has a fixed amount (unlikely for the main profile QR), 
  // simpler logic is to just append/inject Tag 54.
  // Standard position for Tag 54 is usually after Tag 53 (Currency) or 52 (MCC).
  // But EMVCo allows tags in any order (except 00 first, 63 last).
  // We will append Tag 54 and Tag 58 (Country Code) if needed, but usually just appending works 
  // provided we removed the old CRC.
  
  // Let's iterate to find if 54 exists and remove it to be safe.
  let index = 0;
  let cleanQr = "";
  
  while (index < rawQr.length) {
    const tag = rawQr.substr(index, 2);
    const lenStr = rawQr.substr(index + 2, 2);
    const len = parseInt(lenStr, 10);
    
    if (isNaN(len)) break; // End of valid string
    
    const value = rawQr.substr(index + 4, len);
    
    // Skip Tag 54 (Amount) if found, we will add new one later
    // Skip Tag 63 (CRC) if found
    if (tag !== '54' && tag !== '63') {
      cleanQr += `${tag}${lenStr}${value}`;
    }
    
    index += 4 + len;
  }

  // 3. Add the Dynamic Amount (Tag 54)
  // Value must be string, no decimals usually for IDR, but standard supports it.
  const amountStr = Math.floor(amount).toString(); 
  const amountField = formatField('54', amountStr);

  // 4. Construct the payload without CRC
  const payload = cleanQr + amountField + '6304';

  // 5. Calculate new CRC
  const crc = crc16(payload);

  return payload + crc;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}
