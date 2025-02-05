import { COMMANDS_NAMES } from 'components/RichTextEditor/helpers/constants';

/**
 * The maximum image size in bytes.\
 * Is according to the image hosting site's policy. 32 Mb
 */
export const MAX_SIZE_IMG_BYTES = 32 * 1024 * 1024;

/**
 * The maximum size of a raw(binary) image data if it needs to be encoded into a\
 * base64 string.\
 * Base64 encoding causes an overhead of 33–37% relative to the size of the\
 * original binary data (33% by the encoding itself; up to 4% more by the\
 * inserted line breaks).
 */
export const MAX_SIZE_IMG_B64_BYTES = Math.floor(MAX_SIZE_IMG_BYTES / 1.37);

export const defaultAligningClass = 'center';

export const customImgNodeName = COMMANDS_NAMES.img;
export const customImgNodeTagName = COMMANDS_NAMES.img.toLowerCase(); // и так переводится в нижний регистр просемиррором при экспорте в строку, но для консистентности
