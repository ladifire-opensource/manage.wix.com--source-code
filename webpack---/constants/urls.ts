import {
  badgesPort,
  membersApiPort,
  membersGroupsPort,
  memberPermissionsPort,
  automationPort,
} from '../../test/constants';

export const isProduction = window.location.hostname !== 'localhost';

export const badgesBaseURLWithoutV1 = isProduction ? '/_api/members-badges-server' : `http://localhost:${badgesPort}`;

export const badgesBaseURL = isProduction ? '/_api/members-badges-server/v1' : `http://localhost:${badgesPort}`;

export const actionTriggersBaseURL = isProduction
  ? '/_api/action-triggers-server/v1'
  : `http://localhost:${automationPort}`;

export const membersApiBaseURL = isProduction ? '/_api/wix-sm-webapp/v1' : `http://localhost:${membersApiPort}`;

export const membersGroupsBaseURL = isProduction
  ? '/_api/members-groups-web/v1'
  : `http://localhost:${membersGroupsPort}`;

export const memberPermissionsBaseURL = (metaSiteId: string) =>
  isProduction ? `/_api/member-permissions-server/metasite/${metaSiteId}` : `http://localhost:${memberPermissionsPort}`;
