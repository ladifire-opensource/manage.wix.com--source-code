import Experiments from '@wix/wix-experiments';

let experimentsPromise;

async function getExperiments() {

  const experiments = new Experiments();
  experimentsPromise = experiments
    .load('business-manager')
    .then(() => experiments);
  return experimentsPromise;
}

export async function isExperimentEnabled(specName) {
  const exps = await getExperiments();
  return exps.enabled(specName);
}
