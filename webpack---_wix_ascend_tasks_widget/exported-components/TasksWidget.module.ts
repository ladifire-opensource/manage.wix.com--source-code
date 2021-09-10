import { ResolveFn } from '@wix/yoshi-flow-bm';
import { Task } from '../services/interfaces';
import { appDefIds, getCurrentInstance } from '@wix/business-manager-api';

const enrichedApiUrl = '/_api/tasks-view-model-server/tasks';

export interface ResolvedProps {
  tasksList: Task[];
  success: boolean;
}

export const resolve: ResolveFn<ResolvedProps> = async ({
  fedopsLogger,
  httpClient,
}) => {
  fedopsLogger.appLoadStarted();
  const headers = {
    Authorization: getCurrentInstance(appDefIds.metaSite),
  };
  const { data } = await httpClient.get<{ tasks: Task[] }>(enrichedApiUrl, {
    headers,
  });
  const success = true;
  return {
    tasksList: data.tasks,
    success,
  };
};
