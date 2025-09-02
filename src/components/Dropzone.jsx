import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({ handlePictureChange }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section>
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps({
            name: "picture",
            onChange: handlePictureChange,
          })}
        />
        {thumbs.length === 0 && (
          <span className="btn-ghost">
            <strong>+</strong> Ajoute une photo
          </span>
        )}
        <aside>{thumbs}</aside>
      </div>
    </section>
  );
};

export default Dropzone;
