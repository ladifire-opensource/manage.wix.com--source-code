import {isProduction, isTesting, isBO} from './webpack-env';

export const isProductionSentry = () => isProduction && !isBO && !isTesting;
