import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponse } from 'utils/api/utils';
import { fileTypesImage, checkFileType } from 'utils/filesTypes';

export const uploadImgBinary = createAsyncThunk(
  'author/imgBinary/post',
  ({ evt, context }) => {
    return new Promise((resolve, reject) => {
      if (!evt.target.value) {
        reject(new Error('No file selected!'));
      }

      const file = evt.target.files[0];

      if (!checkFileType(file, fileTypesImage)) {
        reject(new Error('Invalid file type!'));
      }

      const reader = new FileReader();

      reader.onerror = (e) => {
        reject(new Error(`Error on reading binary file: ${e.type}`));
      };

      reader.onload = (onloadEvt) => {
        let result = onloadEvt.target.result;
        const indexOfStart = result.indexOf('base64');
        // cut off the metadata indicating that the data is encoded in base-64
        result = result.slice(indexOfStart + 7);

        fetch(`${context._baseUrl}/user_upload_image_p`, {
          method: 'POST',
          headers: context._headers,
          body: result,
          credentials: 'include',
        })
          .then(checkResponse)
          .then(resolve)
          .catch((err) =>
            reject(
              new Error(`Error on POST user_upload_image_p: ${{ error: err }}`)
            )
          );
      };

      // encode to base-64
      reader.readAsDataURL(file);
    });
  }
);
