// @ts-check
import { useMemo } from 'react';
import { defaultValidationOptions } from './constants';
import { deepmerge } from '@mui/utils';

/**
 * Объединение заданных настроек с настройками по умолчанию
 *
 * @param {Partial<import('./types').TJDValidationOptions>} [validationOptionsFromProps]
 * @returns {import('./types').TJDValidationOptions | undefined}
 */
export const useValidation = (validationOptionsFromProps) => {
  const res = useMemo(() => {
    if (!validationOptionsFromProps) {
      return;
    } else {
      return deepmerge(defaultValidationOptions, validationOptionsFromProps);
    }
  }, [validationOptionsFromProps]);

  return res;
};
