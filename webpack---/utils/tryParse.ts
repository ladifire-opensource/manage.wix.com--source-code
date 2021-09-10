import { error } from './logger';

export function tryParse(str: string) {
  let res: any = str;
  try {
    res = JSON.parse(str);
  } catch (e) {
    error('Parse error in string');
    error(e.message);
  }
  return res;
}
