import { AxiosInstance } from 'axios';

import {
  ListBadgesResponse,
  CreateBadgeRequest,
  CreateBadgeResponse,
  UpdateBadgeRequest,
  UpdateBadgeResponse,
  DeleteBadgeRequest,
  GetBadgeResponse,
} from '../../typings/badge-types';
import {
  API_BADGE_MEMBERS_ROUTE,
  API_BADGE_REMOVE_MEMBERS_ROUTE,
  API_BADGE_ROUTE,
  API_BADGES_ROUTE,
} from '../../constants/routes';

export class BadgesService {
  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  private axiosInstance: AxiosInstance;

  async listBadges() {
    const { data } = await this.axiosInstance.get<ListBadgesResponse>(API_BADGES_ROUTE());
    return data.badges;
  }

  async getBadge(id: string) {
    const { data } = await this.axiosInstance.get<GetBadgeResponse>(API_BADGE_ROUTE(id));
    return data.badge;
  }

  async createBadge(badge: CreateBadgeRequest) {
    const { data } = await this.axiosInstance.post<CreateBadgeResponse>(API_BADGES_ROUTE(), { ...badge });
    return data.badge;
  }

  async updateBadge(badge: UpdateBadgeRequest) {
    const { data } = await this.axiosInstance.put<UpdateBadgeResponse>(API_BADGE_ROUTE(badge.id), { ...badge });
    return data.badge;
  }

  async deleteBadge(badge: DeleteBadgeRequest) {
    await this.axiosInstance.delete(API_BADGE_ROUTE(badge.id));
  }

  async addMembersToBadge(badgeId: string, memberIds: string[]) {
    await this.axiosInstance.post(API_BADGE_MEMBERS_ROUTE(badgeId), { memberIds });
  }

  async removeMembersFromBadge(badgeId: string, memberIds: string[]) {
    await this.axiosInstance.post(API_BADGE_REMOVE_MEMBERS_ROUTE(badgeId), { memberIds });
  }
}
