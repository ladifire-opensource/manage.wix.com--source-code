import {
  GetAssigneeCandidatesResponse,
  UpdateAssigneeRequest,
  ObjectType,
  GetAssigneesResponse,
} from '@wix/assignee-types';

export class AssigneeApi {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getCandidates(objectType: string): Promise<GetAssigneeCandidatesResponse> {
    return this.httpClient.get(apiRoute('assigneeCandidates'), {
      params: { objectType },
    });
  }

  getAssignees(): Promise<GetAssigneesResponse> {
    return this.httpClient.get(apiRoute('assignees'));
  }

  assignEntityTo(
    objectId: string,
    objectType: ObjectType,
    userIds: string[],
  ): Promise<void> {
    const updateAssigneesRequest: UpdateAssigneeRequest = {
      objectId,
      objectType,
      userIds,
    };
    return this.httpClient.post(
      apiRoute('updateAssignees'),
      updateAssigneesRequest,
    );
  }
}

export const apiRoute = (route) => `/_serverless/assignee-service/${route}`;

export interface IAssigneeAPI {
  getCandidates(objectType: string): Promise<GetAssigneeCandidatesResponse>;
  getAssignees(): Promise<GetAssigneesResponse>;

  assignEntityTo(
    objectId: string,
    objectType: string,
    userIds: string[],
  ): Promise<void>;
}

export interface HttpClient {
  get(url: string, opts?: any): Promise<any>;
  post(url: string, body?: Object): Promise<any>;
  patch(url: string, body?: Object): Promise<any>;
  delete(url: string): Promise<any>;
}
