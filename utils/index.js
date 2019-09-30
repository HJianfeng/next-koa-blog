import pako from 'pako';

export const unzip = (b64Data) => {
  let strData = atob(b64Data);
  // Convert binary string to character-number array
  const charData = strData.split('').map((x) => { return x.charCodeAt(0); });
  // Turn number array into byte-array
  const binData = new Uint8Array(charData);
  // // unzip
  const data = pako.inflate(binData);
  // Convert gunzipped byteArray back to ascii string:
  strData = String.fromCharCode.apply(null, new Uint16Array(data));
  return decodeURIComponent(strData);
};

export const zip = (str) => {
  const binaryString = pako.gzip(encodeURIComponent(str), { to: 'string' });
  return btoa(binaryString);
};
