import Experiments from '@wix/wix-experiments';

export const fetchExperiments = async () => {
    const experiments = new Experiments({scope: 'wix-code'});
    await experiments.ready();
    return experiments.all();
};
