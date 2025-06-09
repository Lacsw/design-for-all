import { EmblaCarouselType } from 'embla-carousel';

export type TSetSlideStyles = (
  emblaApi: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number
) => void;

export type TSetContainerStyles = (
  emblaApi: EmblaCarouselType,
  wheelRotation: number
) => void;
