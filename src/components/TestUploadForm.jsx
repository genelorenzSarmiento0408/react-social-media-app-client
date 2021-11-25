import React from "react";
import { gql, useMutation } from "@apollo/client";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
export default function TestUploadForm() {
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadFile({ variables: { file } });
  };
  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
