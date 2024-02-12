export async function arrayBufferToBase64(
  arrayBuffer: ArrayBuffer
): Promise<string> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result?.toString();
      console.log(base64String);
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error("No se pudo obtener la cadena base64."));
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(blob);
  });
}
