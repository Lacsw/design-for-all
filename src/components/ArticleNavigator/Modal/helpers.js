import { createPiecewiseLinearFunc } from 'utils/helpers/math';

/** @param {import('embla-carousel').EmblaCarouselType} emblaApi */
export function calcCentralSlideIdx(emblaApi) {
  const scrollProgress = emblaApi.scrollProgress();
  const snapsList = emblaApi.scrollSnapList();

  let closestSlideIndex = 0;
  let smallestDistance = Infinity;

  for (let i = 0; i < snapsList.length; i++) {
    const slideSnap = snapsList[i];
    const slideDistanceFromCenter = Math.abs(scrollProgress - slideSnap);
    if (slideDistanceFromCenter < smallestDistance) {
      smallestDistance = slideDistanceFromCenter;
      closestSlideIndex = i;
    } else {
      break;
    }
  }

  return [closestSlideIndex, smallestDistance];
}

// что-то типа ветви параболы
export const translateCorrector = createPiecewiseLinearFunc(
  [0, 1, 2, 3, 4],
  [0, 12, 37, 70, 110]
);
