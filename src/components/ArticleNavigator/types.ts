/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModalOwnProps } from '@mui/material';
import type {
  targetHeadingsDefault,
  firstShowingOffsetDefault,
  scrollPercentDefault,
} from './constants';

export interface IArticleNavigatorProps {
  /**
   * Булевый флаг, который отвечает за ререндер.\
   * Поменяйте его значение, когда компонент редактора закончит\
   * парсинг и **вставку своих нод в dom-дерево**!
   */
  flag: boolean;
  /**
   * Cелектор эл-та, в который будут вставлены эл-ты навигатора(через портал).\
   * Влияет на то, корректно ли будет заблокирован скролл на странице,\
   * при открытой модалке(`modal`).
   */
  parentSelector?: string;
  /**
   * Cелектор для элемента внутри `targetRef`, в котором будут искаться
   * заголовки.
   */
  targetSelector: string;
  /** ссылка на dom-element, в котором будут искаться заголовки */
  targetRef: React.RefObject<HTMLElement | null>;
  /**
   * 1. селектор эл-та, который прокручивается. События скролла данного эл-та(и
   *    `firstShowingOffset`) будут использованы для вычисления необходимости
   *    появления компонента
   * 2. Искать, начиная с `document`(root), или можно искать внутри
   *    `targetRef`(target).
   */
  scrollableElParams: [string, 'root' | 'target'];
  /**
   * величина смещения первого заголовка в пикселях относительно верха окна(по
   * модулю), начиная с которой элемент навигатора будет появляться.
   *
   * Default is {@link firstShowingOffsetDefault}
   */
  firstShowingOffset?: number;
  /**
   * порог для величины прокрутки после которого эл-т скрывается
   *
   * Default is {@link scrollPercentDefault}
   */
  scrollPercent: number;
  /**
   * Какие заголовки искать.
   *
   * Default is {@link targetHeadingsDefault}.
   */
  targetHeadings: number[];
  slotProps?: {
    bar?: IBaseProps & { slotProps?: ModalOwnProps['slotProps'] };
    modal?: IBaseProps & { slotProps?: ModalOwnProps['slotProps'] };
  };
}

export interface IArtNavBarProps extends IBaseProps {
  parentSelector?: IArticleNavigatorProps['parentSelector'];
  isShowing: boolean;
  disableScrollLock?: boolean;
  label: string;
  /** Номер текущего заголовка */
  index: number;
  /** Число заголовков */
  quantity: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  slotProps?: ModalOwnProps['slotProps'];
}

export type TClosingReasons = 'click' | 'escapeKeyDown' | 'backdropClick';

export interface ICloseArtNavModal {
  (reason: TClosingReasons, el?: HTMLHeadElement): void;
}

export interface IArtNavModalProps extends IBaseProps {
  parentSelector?: IArticleNavigatorProps['parentSelector'];
  isOpen: boolean;
  headings: HTMLHeadElement[];
  onClose: ICloseArtNavModal;
  slotProps?: ModalOwnProps['slotProps'];
}
