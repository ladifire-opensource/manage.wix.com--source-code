import {
  SiteMember,
  MembersRequest,
  PermissionsConfig,
  PaginationResponse,
  GroupsPermissions,
  GroupInfo,
  AssignedPermission,
  ContactsQueryRequest
} from '@wix/member-permissions-server/dist/src/types/domain-types';
import {SiteMembersSettingsDTO} from '../stores/site-member-settings';

export interface HttpClient {
  get(url: string, opts?: any): Promise<any>;
  post(url: string, body?: Object): Promise<any>;
  patch(url: string, body?: Object): Promise<any>;
  delete(url: string): Promise<any>;
}

export interface MembersResponse {
  members: SiteMember[];
  pagination: PaginationResponse;
}

export default class ClientApi {
  private httpClient: HttpClient;
  private serverPath: string;
  private msid: string;

  constructor(httpClient: HttpClient, serverPath: string, msid: string) {
    this.httpClient = httpClient;
    this.serverPath = serverPath;
    this.msid = msid;
  }

  getAdmins = ({query, order, limit, offset}: MembersRequest = {}): Promise<MembersResponse> => {
    return this._getMembersByType('admins', query, order, limit, offset);
  }

  hasMembers = (): Promise<boolean> => {
    return this.httpClient.get(this._apiRoute('hasMembers'));
  }

  getApprovedMembers = ({query, order, limit, offset}: MembersRequest = {}): Promise<
    MembersResponse
  > => {
    return this._getMembersByType('approvedMembers', query, order, limit, offset);
  }

  getPendingMembers = ({query, order, limit, offset}: MembersRequest = {}): Promise<
    MembersResponse
  > => {
    return this._getMembersByType('pendingMembers', query, order, limit, offset);
  }

  getBlockedMembers = ({query, order, limit, offset}: MembersRequest = {}): Promise<
    MembersResponse
  > => {
    return this._getMembersByType('blockedMembers', query, order, limit, offset);
  }

  getGroups = (): Promise<GroupInfo[]> => {
    return this.httpClient.get(this._apiRoute('groups'));
  }

  getGroupsCount = (): Promise<{[groupId: string]: number}> => {
    return this.httpClient.get(this._apiRoute('groupsCount'));
  }
  getGhostTownPermissions = () => {
    return this.httpClient.get('/_api/members-groups-web/v1/groups/00000000-0000-0000-0000-000000000001/permissions');
  }
  getGroupsPermissions = (): Promise<{[roleId: string]: AssignedPermission[]}> => {
    return this.httpClient.get(this._apiRoute('groupsPermissions'));
  }

  getGroupById = (groupId: string): Promise<GroupInfo> => {
    return this.httpClient.get(this._apiRoute(`groups/${groupId}`));
  }

  createGroup = (newGroup: GroupInfo): Promise<GroupInfo> => {
    return this.httpClient.post(this._apiRoute('groups'), newGroup);
  }

  updateGroup = (updatedGroup: GroupInfo): Promise<GroupInfo> => {
    return this.httpClient.patch(this._apiRoute(`groups/${updatedGroup.id}`), updatedGroup);
  }

  deleteGroup = (groupId: string): Promise<GroupInfo> => {
    return this.httpClient.delete(this._apiRoute(`groups/${groupId}`));
  }

  addUsersToGroups = (users: string[], groupIds: string[]): Promise<string[]> => {
    const addUsersRequest = {userIds: users, groupIds};
    return this.httpClient.post(this._apiRoute('addMembersToGroups'), addUsersRequest);
  }

  removeUsersFromGroups = (users: string[], groupIds: string[]): Promise<string[]> => {
    const removeUsersRequest = {userIds: users, groupIds};
    return this.httpClient.post(this._apiRoute('removeMembersFromGroups'), removeUsersRequest);
  }

  addPermissionsToGroups = (groupsPermissions: GroupsPermissions): Promise<any> => {
    return this.httpClient.post(this._apiRoute('addPermissionsToGroups'), groupsPermissions);
  }

  removePermissionsFromGroups = (groupsPermissions: GroupsPermissions): Promise<any> => {
    return this.httpClient.post(this._apiRoute('removePermissionsFromGroups'), groupsPermissions);
  }

  approveMember = (memberId: string): Promise<any> => {
    return this.httpClient.post(this._apiRoute(`members/${memberId}/approve`));
  }

  blockMember = (memberId: string): Promise<any> => {
    return this.httpClient.post(this._apiRoute(`members/${memberId}/block`));
  }

  deleteMember = (memberId: string): Promise<any> => {
    return this.httpClient.delete(this._apiRoute(`members/${memberId}`));
  }

  resetMemberPassword = (memberId: string): Promise<any> => {
    return this.httpClient.post(this._apiRoute(`members/${memberId}/resetPassword`));
  }

  getEditorPermissionsConfig = (): Promise<PermissionsConfig> => {
    return this.httpClient.get(this._apiRoute('editorPermissionsConfig'));
  }

  getMembersByGroupId = ({
    groupId,
    offset,
    limit,
    order,
    query
  }: {
    groupId: string;
    offset?: number;
    limit?: number;
    order?: string;
    query?: string;
  }): Promise<MembersResponse> => {
    return this.httpClient.get(this._apiRoute(`groups/${groupId}/users`), {
      params: {limit, offset, order, query}
    });
  }

  getMyAccountUrl = () => {
    return this.httpClient.get(this._apiRoute('myAccountUrl'));
  }

  isADI = (): Promise<boolean> => {
    return this.httpClient.get(this._apiRoute('isADI'));
  }

  fetchSiteMemberSettings = (): Promise<SiteMembersSettingsDTO> => {
    return this.httpClient.get(this._apiRoute('siteMemberSettings'));
  }

  updateSiteMemberSettings = (siteMemberSettings: SiteMembersSettingsDTO): Promise<any> => {
    return this.httpClient.post(this._apiRoute('siteMemberSettings'), {siteMemberSettings});
  }

  getHomePageWithSignupUrl = async () => {
    try {
      return await this.httpClient.get(this._apiRoute('homePageWithSignup'));
    } catch (e) {
      return '';
    }
  }

  hasMembersArea = (): Promise<boolean> => {
    return this.httpClient.get(this._apiRoute('hasMembersArea'));
  }

  getContactsWithoutMembership = (params?: ContactsQueryRequest): Promise<any> => {
    return this.httpClient.get(this._apiRoute('contactsWithoutMembership'), {
      params
    });
  }

  getContactsLabels = (): Promise<any> => {
    return this.httpClient.get(this._apiRoute('contactsLabels'));
  }

  registerContactsAsMembers = (request: {contactsEmails?: string[], selectAll?: boolean, withLabels?: string[], search?: string, excludedContactsEmails?: string[]}): Promise<number> => {
    return this.httpClient.post(this._apiRoute('registerContactsAsMembers'), request);
  }

  private _apiRoute(route) {
    return apiRoute(this.serverPath, this.msid, route);
  }

  private _getMembersByType(type, query, order, limit, offset) {
    return this.httpClient.get(this._apiRoute(type), {
      params: {query, order, limit, offset}
    });
  }
}

export const apiRoute = (serverPath, msid, route) =>
  `/_api/${serverPath}/metasite/${msid}/${route}`;
