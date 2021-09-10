import axios from 'axios';

export const API_BASE_URL = '/_api/ping/settings';

export class PingSettingsAPI {
  async getSettings(topic: string, channel: string): Promise<GetSettingsData> {
    const res = await axios.get(`${API_BASE_URL}/setting/${topic}?channel=${channel}`);
    return res.data;
  }
}

export interface SetSettingRequest {
  setData: SetSettingsData[];
}

export interface SetSettingsData {
  topicPrefix: string;
  channel: string;
  settingsData: {
    mute: boolean;
  };
}

export interface GetSettingsData {
  subscribed: boolean;
  settingsData?: {
    mute: boolean;
  };
}
