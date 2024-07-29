const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const encodeBase64 = (base64: string) => {
  const base64String = base64.split(",")[1];
  return Buffer.from(base64String, "base64");
};

const decodeBase64 = (buffer: Buffer) => {
  return `data:image/png;base64,${buffer.toString("base64")}`;
};

export { toBase64, encodeBase64, decodeBase64 };
