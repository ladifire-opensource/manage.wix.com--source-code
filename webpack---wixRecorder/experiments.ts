import Experiments from '@wix/wix-experiments';

const experiments = new Experiments({ useNewApi: true });

export async function conductExperiment(name: string): Promise<boolean> {
  const res = await experiments.conduct(name, 'false');
  return res === 'true' || res === 'new';
}
