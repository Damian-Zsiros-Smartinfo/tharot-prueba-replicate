import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone, FileRejection, Accept, DropEvent } from "react-dropzone";

interface DropzoneProps {
  onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
  accept?: Accept;
  open?: () => void;
  setImages: Dispatch<SetStateAction<{ file: { name: string }, arrayBuffer: Buffer }[]>>
}
async function convertFileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error('Error al convertir el archivo a ArrayBuffer.'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error al leer el archivo.'));
    };

    reader.readAsArrayBuffer(file);
  });
}
const Dropzone: React.FC<DropzoneProps> = ({ setImages, accept, open }) => {
  const onDrop:
    | (<T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => void)
    | undefined = (acceptedFiles) => {
      acceptedFiles.forEach(async (file: File) => {
        try {
          const arrayBuffer = await convertFileToArrayBuffer(file);
          const buffer = Buffer.from(arrayBuffer)
          console.log({ file, buffer });
          setImages(images => [...images, { file: { name: file.name }, arrayBuffer: buffer }])
        } catch (error) {
          console.error('Error al procesar el archivo:', error);
        }
      });
    };
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "image/jpg": [".jpg"],
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
      },
      onDrop,
    });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <div className="w-full min-h-[100px] grid place-items-center border-[#3B82F6] border-spacing-3 rounded py-4 border-dashed border-[4px] transition hover:scale-[1.01] cursor-pointer">
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="dropzone-content">Suelta el archivo aqui </p>
          ) : (
            <p className="dropzone-content">
              Arrastra tus imagenes para subir al mensaje
            </p>
          )}
          <button type="button" onClick={open} className="btn">
            Click to select files
          </button>
        </div>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default Dropzone;
