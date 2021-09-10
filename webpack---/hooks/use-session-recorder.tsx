import {
  sessionRecorder,
  SessionRecorder,
} from '@src/services/session-recorder';

export const useSessionRecorder = (): SessionRecorder => sessionRecorder;
