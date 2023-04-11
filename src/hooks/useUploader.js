import { useState, createRef } from 'react';
import { readAsPDF, readAsDataURL, readAsImage } from '../utils/asyncReader';
import { ggID } from '../utils/helpers';
import { AttachmentTypes } from '../entities';
export var UploadTypes;
(function (UploadTypes) {
  UploadTypes['PDF'] = 'pdf';
  UploadTypes['IMAGE'] = 'image';
})(UploadTypes || (UploadTypes = {}));
const handlers = {
  pdf: async (file) => {
    try {
      const pdf = await readAsPDF(file);
      return {
        file,
        name: file.name,
        pages: Array(pdf.numPages)
          .fill(0)
          .map((_, index) => pdf.getPage(index + 1)),
      };
    } catch (error) {
      console.log('Failed to load pdf', error);
      throw new Error('Failed to load PDF');
    }
  },
  image: async (file) => {
    try {
      const url = await readAsDataURL(file);
      const img = await readAsImage(url);
      const id = ggID();
      const { width, height } = img;
      const imageAttachemnt = {
        id,
        type: AttachmentTypes.IMAGE,
        width,
        height,
        x: 0,
        y: 0,
        img,
        file,
      };
      return imageAttachemnt;
    } catch (error) {
      console.log('Failed to load image', error);
      throw new Error('Failed to load image');
    }
  },
};
/**
 * @function useUploader
 *
 * @description This hook handles pdf and image uploads
 *
 * @
 * @param use UploadTypes
 */
export const useUploader = ({ use, afterUploadPdf, afterUploadAttachment }) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = createRef();
  const onClick = (event) => {
    event.currentTarget.value = '';
  };
  const handleClick = () => {
    const input = inputRef.current;
    if (input) {
      setIsUploading(true);
      input.click();
    }
  };
  const upload = async (event) => {
    debugger;
    if (!isUploading) {
      return;
    }
    const files =
      event.currentTarget.files ||
      (event.dataTransfer && event.dataTransfer.files);
    if (!files) {
      setIsUploading(false);
      return;
    }
    const file = files[0];
    const result = await handlers[use](file);
    if (use === UploadTypes.PDF && afterUploadPdf) {
      afterUploadPdf(result);
    }
    if (use === UploadTypes.IMAGE && afterUploadAttachment) {
      console.log('===> was this also called');
      afterUploadAttachment(result);
    }
    setIsUploading(false);
    return;
  };
  return {
    upload,
    onClick,
    inputRef,
    isUploading,
    handleClick,
  };
};
