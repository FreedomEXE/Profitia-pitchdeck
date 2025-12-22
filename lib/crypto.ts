import { timingSafeEqual } from "crypto";

export function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    const maxLength = Math.max(aBuffer.length, bBuffer.length);
    const aPadded = Buffer.concat([aBuffer, Buffer.alloc(maxLength - aBuffer.length)]);
    const bPadded = Buffer.concat([bBuffer, Buffer.alloc(maxLength - bBuffer.length)]);
    timingSafeEqual(aPadded, bPadded);
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}