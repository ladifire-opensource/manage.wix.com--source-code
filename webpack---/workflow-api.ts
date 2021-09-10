import {
  CreateCardResponse,
  MovePhaseResponse,
  GetWorkflowResponse,
  CreateCardRequest,
  UpdateCardResponse,
  UpdateCardRequest,
  MoveCardRequest,
  MovePhaseRequest,
  MoveCardResponse,
  UpdatePhaseResponse,
  UpdateWorkflowResponse,
  UpdateWorkflowRequest,
  UpdatePhaseRequest,
  CardInfo,
  ListWorkflowsResponse,
  CreateWorkflowResponse,
  CreateWorkflowRequest,
  WorkflowInfo,
  CreatePhaseResponse,
  CreatePhaseRequest,
  PhaseInfo,
  DeleteWorkflowResponse,
  ListCardsResponse,
  ListCardsRequest,
  ListPhasesResponse,
  ListPhasesRequest,
  ListWorkflowsRequest,
  RestoreCardResponse,
  RestoreCardRequest,
  DeleteCardResponse,
  DeletePhaseResponse,
  ArchiveCardResponse,
  CloneTemplateResponse,
  Workflow
} from './types/domain-types';
import {CARDS_PAGE_SIZE} from './consts';

interface HttpResponse {
  data: any;
  headers: any;
}

export interface HttpClient {
  get(url: string, opts?: any): Promise<HttpResponse>;
  post(url: string, body?: Object): Promise<HttpResponse>;
  patch(url: string, body?: Object): Promise<HttpResponse>;
  delete(url: string): Promise<HttpResponse>;
}

export interface WorkflowApi {
  addMiddleware(middle: Function);
  getWorkflow(id, cardsInitialPageSize?): Promise<GetWorkflowResponse>;
  deleteWorkflow(id): Promise<DeleteWorkflowResponse>;
  listWorkflows(listWorkflowsProps: ListWorkflowsRequest): Promise<ListWorkflowsResponse>;
  queryWorkflows(queryWorkflowsProps: any): Promise<Workflow[]>;
  listPhases(listPhasesProps: ListPhasesRequest): Promise<ListPhasesResponse>;
  createWorkflow(workflow): Promise<CreateWorkflowResponse>;
  createPhase(workflowId, phase): Promise<CreatePhaseResponse>;
  addCard(workflowId, phaseId, card): Promise<CreateCardResponse>;
  moveCard(cardId, newPhaseId, newPosition): Promise<MoveCardResponse>;
  deleteCard(cardId): Promise<DeleteCardResponse>;
  archiveCard(cardId): Promise<ArchiveCardResponse>;
  restoreCard(cardId, newPhaseId, newPosition): Promise<RestoreCardResponse>;
  movePhase(workflowId, phaseId, newPosition): Promise<MovePhaseResponse>;
  renameCard(cardId: any, newName: string): void;
  renameWorkflow(workflowId: any, newName: string): Promise<UpdateWorkflowResponse>;
  renamePhase(phaseId: any, newName: string): Promise<UpdatePhaseResponse>;
  deletePhase(phaseId: any): void;
  listCards(listCardProps: ListCardsRequest): Promise<ListCardsResponse>;
  cloneWorkflowFromTemplate(id: string): Promise<CloneTemplateResponse>;
}

export class WorkflowApiClient implements WorkflowApi {
  private httpClient: HttpClient;
  private serverPath: string;

  private middlewares = [];

  constructor(httpClient: HttpClient, serverPath: string) {
    this.httpClient = httpClient;
    this.serverPath = serverPath;
  }

  addMiddleware (mid) {
    this.middlewares.push(mid);
  }

  getWorkflow(id, cardsInitialPageSize = CARDS_PAGE_SIZE): Promise<GetWorkflowResponse> {
    return this.httpClient.get(this._apiRoute(`workflows/${id}?cardsInitialPageSize=${cardsInitialPageSize}`)).then(this.handleResponse);
  }

  listWorkflows({
    limit = 100,
    offset,
    order,
    fields
  }: ListWorkflowsRequest = {}): Promise<ListWorkflowsResponse> {
    const listWorkflowsRequest: ListWorkflowsRequest = {
      limit,
      offset,
      order,
      fields
    };

    return this.httpClient.get(this._apiRoute('workflows'), {
      params: listWorkflowsRequest
    }).then(this.handleResponse);
  }

  queryWorkflows({
    limit = 100,
    offset,
    order,
    query
  }: any = {}): Promise<Workflow[]> {
    const listWorkflowsRequest = {
      limit,
      offset,
      order,
      query
    };

    return this.httpClient.post(this._apiRoute('workflows/query'), {
      params: listWorkflowsRequest
    }).then(this.handleResponse);
  }

  listPhases({
    workflowId,
    limit = 100,
    offset,
    order,
    fields
  }: ListPhasesRequest = {}): Promise<ListPhasesResponse> {
    const listPhasesRequest: ListPhasesRequest = {
      limit,
      offset,
      order,
      fields
    };
    return this.httpClient.get(this._apiRoute(`workflows/${workflowId}/phases`), {
      params: listPhasesRequest
    }).then(this.handleResponse);
  }

  createWorkflow(workflow: WorkflowInfo): Promise<CreateWorkflowResponse> {
    const createWorkflowReq: CreateWorkflowRequest = {workflow};
    return this.httpClient.post(this._apiRoute('workflows'), createWorkflowReq).then(this.handleResponse);
  }

  deleteWorkflow(id): Promise<DeleteWorkflowResponse> {
    return this.httpClient.delete(this._apiRoute(`workflows/${id}`)).then(this.handleResponse);
  }

  createPhase(workflowId, phase: PhaseInfo): Promise<CreatePhaseResponse> {
    const createPhaseReq: CreatePhaseRequest = {phase};
    return this.httpClient.post(this._apiRoute(`workflows/${workflowId}/phases`), createPhaseReq).then(this.handleResponse);
  }

  addCard(workflowId, phaseId, card: CardInfo): Promise<CreateCardResponse> {
    const addCardReq: CreateCardRequest = {card};
    return this.httpClient.post(
      this._apiRoute(`workflows/${workflowId}/phases/${phaseId}/cards`),
      addCardReq
    ).then(this.handleResponse);
  }

  moveCard(cardId, newPhaseId, newPosition): Promise<MoveCardResponse> {
    const movePhaseReq: MoveCardRequest = {newPhaseId, newPosition};
    return this.httpClient.post(this._apiRoute(`cards/${cardId}/move`), movePhaseReq).then(this.handleResponse);
  }

  movePhase(workflowId, phaseId, newPosition): Promise<MovePhaseResponse> {
    const movePhaseReq: MovePhaseRequest = {newPosition};
    return this.httpClient.post(
      this._apiRoute(`workflows/${workflowId}/phases/${phaseId}/move`),
      movePhaseReq
    ).then(this.handleResponse);
  }

  renameCard(cardId: any, newName: string): Promise<UpdateCardResponse> {
    const updateCardRequest: UpdateCardRequest = {cardInfo: {id: cardId, name: newName}};
    return this.httpClient.patch(this._apiRoute(`cards/${cardId}`), updateCardRequest).then(this.handleResponse);
  }

  renameWorkflow(workflowId: any, newName: string): Promise<UpdateWorkflowResponse> {
    const updateWorkflowRequest: UpdateWorkflowRequest = {
      workflow: {id: workflowId, name: newName}
    };
    return this.httpClient.patch(this._apiRoute(`workflows/${workflowId}`), updateWorkflowRequest).then(this.handleResponse);
  }

  renamePhase(phaseId: any, newName: string): Promise<UpdatePhaseResponse> {
    const updatePhaseRequest: UpdatePhaseRequest = {phase: {id: phaseId, name: newName}};
    return this.httpClient.patch(this._apiRoute(`phases/${phaseId}`), updatePhaseRequest).then(this.handleResponse);
  }

  deletePhase(phaseId: any): Promise<DeletePhaseResponse> {
    return this.httpClient.delete(this._apiRoute(`phases/${phaseId}`)).then(this.handleResponse);
  }

  deleteCard(cardId): Promise<DeleteCardResponse> {
    return this.httpClient.delete(this._apiRoute(`cards/${cardId}`)).then(this.handleResponse);
  }

  archiveCard(cardId): Promise<ArchiveCardResponse> {
    return this.httpClient.post(this._apiRoute(`cards/${cardId}/archive`)).then(this.handleResponse);
  }

  restoreCard(cardId, newPhaseId, newPosition): Promise<RestoreCardResponse> {
    const restoreCardRequest: RestoreCardRequest = {
      newPhaseId,
      newPosition
    };
    return this.httpClient.post(this._apiRoute(`cards/${cardId}/restore`), restoreCardRequest).then(this.handleResponse);
  }

  listCards({
    workflowId,
    phaseId,
    fetchArchived,
    limit = CARDS_PAGE_SIZE,
    offset,
    order,
    fields,
    attachmentValue
  }: ListCardsRequest = {}): Promise<ListCardsResponse> {
    const listCardsRequest: ListCardsRequest = {
      phaseId,
      fetchArchived,
      limit,
      offset,
      order,
      fields,
      attachmentValue
    };
    return this.httpClient.get(this._apiRoute(`workflows/${workflowId}/cards`), {
      params: listCardsRequest
    }).then(this.handleResponse);
  }

  cloneWorkflowFromTemplate(id: string): Promise<CloneTemplateResponse> {
    return this.httpClient.post(this._apiRoute(`templates/${id}/clone`)).then(this.handleResponse);
  }

  private _apiRoute(route) {
    return apiRoute(this.serverPath, route);
  }

  private handleResponse = (response) => {
    const res = this.middlewares.reduce((prev, middleware) => middleware(prev), response);
    return res.data;
  }
}

export const apiRoute = (serverPath, route) => `/_api/${serverPath}/api/v1/${route}`;
