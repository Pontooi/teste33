import { Lesson, TrackId } from '../../types';
import { javaLessons } from './javaLessons';
import { pythonLessons } from './pythonLessons';
import { jsLessons } from './jsLessons';
import { htmlLessons, cssLessons } from './htmlCssLessons';

export const allLessons: Lesson[] = [
  ...javaLessons,
  ...pythonLessons,
  ...jsLessons,
  ...htmlLessons,
  ...cssLessons,
];

export function getLessonsByTrack(trackId: TrackId): Lesson[] {
  return allLessons.filter((l) => l.trackId === trackId);
}

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}
