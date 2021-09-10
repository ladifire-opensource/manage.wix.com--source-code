import Fullstory from './fullstory';

declare global {
  interface Window {
    __wr_on_ready: () => void;
    _fs_ready: any;
  }
}

export interface WixRecorderOptions {
  sample?: number;
  smallApp?: boolean;
}

export interface WixRecorder {
  addLabel(label: string): Promise<void>;
  withExperiments(specs: { [specKey: string]: string }): Promise<void>;
  recordUrl(): Promise<string>;
  addCustomAttribute(key: string, value: string | string[]): Promise<void>;
  __forceRecording(): Promise<void>;
}

const options = getRecorderOptions();

const fullstory = new Fullstory({
  onReady: window.__wr_on_ready,
  sample: options.sample,
  smallApp: options.smallApp,
});

fullstory.setup();

export async function addLabel(label: string) {
  return fullstory.addCustomAttribute('label', label);
}

export async function withExperiments(specs: {
  [specKey: string]: string;
}): Promise<void> {
  Object.keys(specs).map((specKey) =>
    fullstory.addCustomAttribute(specKey, specs[specKey]),
  );
}

export async function addCustomAttribute(
  key: string,
  value: string | string[],
): Promise<void> {
  fullstory.addCustomAttribute(key, value);
}

export async function recordUrl(): Promise<string> {
  return fullstory.getCurrentSessionUrl();
}

export async function __forceRecording(): Promise<void> {
  return fullstory.forceLoadFullstory();
}

function getRecorderOptions(): WixRecorderOptions {
  const opts = {} as WixRecorderOptions;

  try {
    const data = document?.currentScript?.dataset;

    if (data) {
      opts.sample =
        typeof data.sample === 'string' ? parseFloat(data.sample) : undefined;
      opts.smallApp = data.smallApp === 'true';
    }
  } catch {}

  return opts;
}
