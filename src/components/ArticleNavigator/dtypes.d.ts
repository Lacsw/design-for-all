export type TClosingReasons = 'click' | 'esc' | 'backdropClick';

export interface ICloseArtNavModal {
  (reason: TClosingReasons, el?: HTMLHeadElement): void;
}
