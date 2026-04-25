function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

export function buildWavHeader(
  pcmByteCount: number,
  sampleRate = 16000,
  channels = 1,
  bitDepth = 16,
): Uint8Array {
  const buf = new ArrayBuffer(44);
  const v = new DataView(buf);
  writeString(v, 0, 'RIFF');
  v.setUint32(4, 36 + pcmByteCount, true);
  writeString(v, 8, 'WAVE');
  writeString(v, 12, 'fmt ');
  v.setUint32(16, 16, true);
  v.setUint16(20, 1, true); // PCM
  v.setUint16(22, channels, true);
  v.setUint32(24, sampleRate, true);
  v.setUint32(28, (sampleRate * channels * bitDepth) / 8, true);
  v.setUint16(32, (channels * bitDepth) / 8, true);
  v.setUint16(34, bitDepth, true);
  writeString(v, 36, 'data');
  v.setUint32(40, pcmByteCount, true);
  return new Uint8Array(buf);
}

export function base64ToUint8Array(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export function uint8ArrayToBase64(bytes: Uint8Array): string {
  const CHUNK = 0x8000;
  let out = '';
  for (let i = 0; i < bytes.length; i += CHUNK) {
    out += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(out);
}

export function concatUint8Arrays(arrays: Uint8Array[]): Uint8Array {
  const total = arrays.reduce((n, a) => n + a.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const a of arrays) {
    out.set(a, off);
    off += a.length;
  }
  return out;
}

export function pcmChunksToWavBase64(chunks: Uint8Array[]): string {
  const pcm = concatUint8Arrays(chunks);
  const header = buildWavHeader(pcm.length);
  return uint8ArrayToBase64(concatUint8Arrays([header, pcm]));
}

// Finds the 'data' subchunk in a WAV file and returns raw PCM bytes.
export function extractPcmFromWav(wav: Uint8Array): Uint8Array {
  if (wav.length < 44) return wav;
  const view = new DataView(wav.buffer, wav.byteOffset);
  let offset = 12; // skip RIFF/WAVE header
  while (offset + 8 <= wav.length) {
    const id = String.fromCharCode(wav[offset], wav[offset + 1], wav[offset + 2], wav[offset + 3]);
    const size = view.getUint32(offset + 4, true);
    if (id === 'data') return wav.slice(offset + 8, offset + 8 + size);
    offset += 8 + size;
  }
  return wav.slice(44); // fallback: assume standard 44-byte header
}
