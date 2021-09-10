import { InitialData } from '../common/types/types';
import { getInitialData, InitialDataParams } from './initial-data/initial-data.service';
import { navigateToCTA, navigateToParams } from './navigation/navigation.service';
import { dealerEventsService, DealerEventsService } from './dealer-events/dealer-events.service';
import { SessionRecorder } from './session-recorder/session-recorder.types';
import { sessionRecorder } from './session-recorder/session-recorder.service';

interface InitialDataService {
  getInitialData(options: InitialDataParams, reportError: (e: Error) => void): Promise<InitialData>;
}

interface NavigationService {
  navigateToCTA(params: navigateToParams): void;
}

export interface Services extends NavigationService, InitialDataService {
  dealerEventsService: DealerEventsService;
}

interface RecordingService {
  sessionRecorder: SessionRecorder;
}

export interface Services extends NavigationService, InitialDataService, RecordingService {}

export const useServices = (): Services => ({
  getInitialData,
  navigateToCTA,
  dealerEventsService,
  sessionRecorder,
});
