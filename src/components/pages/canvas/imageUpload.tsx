import React from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { useImageContext } from '../../../context/ImageContext'; // Ajuste o caminho conforme necessário

const ImageUpload: React.FC = () => {
  const { addImage } = useImageContext();

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });

  const handleChange = async (info: { file: UploadFile }) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      try {
        const base64 = await getBase64(info.file.originFileObj as RcFile);
        addImage(base64); // Adiciona a imagem em base64 ao contexto
        message.success(`${info.file.name} file uploaded successfully`);
      } catch (error) {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  return (
    <Upload
      accept="image/*"
      customRequest={({ file, onSuccess }) => {
        if (onSuccess) {
          setTimeout(() => onSuccess("ok"), 0);
        }
      }}
      onChange={handleChange}
      listType="picture"
    >
      <button>
        <UploadOutlined /> Click to Upload
      </button>
    </Upload>
  );
};

export default ImageUpload;
