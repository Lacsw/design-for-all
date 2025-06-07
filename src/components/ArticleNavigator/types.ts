/* eslint-disable @typescript-eslint/no-unused-vars */
import { ModalOwnProps } from '@mui/material';
import type {
  targetHeadingsDefault,
  firstShowingOffsetDefault,
  lastShowingOffsetDefault,
} from './constants';

export interface IScrollableRefData {
  el: Element | HTMLDivElement | Document | null;
  /** элемент, в котором можно взять инфу по скроллу (см. #art-nav-1) */
  data: Element | HTMLElement | null;
  /** `ltr` | `rtl` */
  direction: string;
  barWidth: number;
  paddings: {
    t: number;
    r: number;
    b: number;
    l: number;
  };
}

/**
 * Параметры прокручиваемого элемента, внутри которого находится\
 * элемент со статьёй.
 */
export interface IScrollableElParams {
  /**
   * селектор эл-та, который прокручивается. События скролла данного эл-та(и
   * `firstShowingOffset`) будут использованы для вычисления необходимости
   * появления компонента
   */
  selector: string;
  /**
   * Искать прокруч-ый эл-т, начиная с `document`(root), или можно искать внутри
   * `targetRef`(target).
   */
  searchMode: 'root' | 'target';
  /**
   * Булевый флаг, который отвечает за ререндер.\
   * Меняйте его, когда скроллбар в родителе меняет свои свойства:\
   * положение слева-справа или размер.
   */
  flag: boolean;
  /**
   * Марджин для прокручиваемого эл-та, который стоит учитывать при расчете
   * пересечений заголовков.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
   */
  intersectionMargin?: string;
}

export interface IBarBaseProps extends IBaseProps {
  /** время анимации "тень" */
  timeout?: number;
}

/** Пропсы для модалки навигатора статей. */
export interface IModalProps extends IBaseProps {
  /** Пропсы слотов внутри модального элемента Mui. */
  slotProps?: ModalOwnProps['slotProps'];
}

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
   * заголовки.\
   * Это пропс для уточнения - более быстрого поиска.\
   * Можно передать только `targetRef`.
   */
  targetSelector?: string;
  /** ссылка на dom-element, в котором будут искаться заголовки */
  targetRef: React.RefObject<HTMLElement | null>;
  scrollableElParams: IScrollableElParams;
  /**
   * величина смещения первого заголовка в пикселях относительно верха окна(по
   * модулю), начиная с которой элемент навигатора будет появляться.
   *
   * Default is {@link firstShowingOffsetDefault}
   */
  firstShowingOffset?: number;
  /**
   * Порог для величины прокрутки после которого эл-т скрывается.
   *
   * Если быть точнее, то это значение разницы scrollHeight и scrollTop.\
   * Если разница окажется меньше указанного значение - эл-т скроется.
   *
   * Default is {@link lastShowingOffsetDefault}
   */
  lastShowingOffset: number;
  /**
   * Какие заголовки искать.
   *
   * Default is {@link targetHeadingsDefault}.
   */
  targetHeadings: number[];
  onOpen?: (params: IScrollableRefData) => void;
  onClose?: (params: IScrollableRefData) => void;
  slotProps?: {
    bar?: IBarBaseProps;
    modal?: IModalProps;
  };
}

export interface IArtNavBarProps extends IBarBaseProps {
  parentSelector?: IArticleNavigatorProps['parentSelector'];
  isShowing: boolean;
  label: string;
  /** Номер текущего заголовка */
  index: number;
  /** Число заголовков */
  quantity: number;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export type TClosingReasons = 'click' | 'escapeKeyDown' | 'backdropClick';
export interface ICloseArtNavModal {
  (reason: TClosingReasons, el?: HTMLHeadingElement): void;
}

export interface IArtNavModalProps extends IBaseProps {
  parentSelector?: IArticleNavigatorProps['parentSelector'];
  isOpen: boolean;
  headings: HTMLHeadingElement[];
  onClose: ICloseArtNavModal;
  curHeading: HTMLHeadingElement | null;
  setCurHeading: React.Dispatch<
    React.SetStateAction<HTMLHeadingElement | null>
  >;
  slotProps?: ModalOwnProps['slotProps'];
  /** intersection observer, rootMargin - top */
  topMargin: number;
  /** parent with scroll */
  scrollableEl: Element | null;
}
