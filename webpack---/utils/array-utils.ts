export class ArraySubsetsBuilder<T> {
  private array: T[];

  constructor(array: T[]) {
    this.array = array;
  }

  whereEverySubsetMatchesRule(isSubsetStillValid: (subset: T[]) => boolean): T[][] {
    const subsets: T[][] = [[]];
    for (const item of this.array) {
      const currentSubset = subsets[subsets.length - 1];
      if (isSubsetStillValid([...currentSubset, item])) {
        currentSubset.push(item);
      } else {
        subsets.push([item]);
      }
    }
    return subsets;
  }
}

export const splitArrayIntoSubsets = <T>(array: T[]) => new ArraySubsetsBuilder<T>(array);

export const mergeArrays = <T>(arrays: T[][]) =>
  [...arrays[0], ...(arrays.length > 1 ? mergeArrays(arrays.slice(1)) : [])];

export const zip = <T>(arr1: T[], arr2: T[]): T[][] =>
  arr1.map((_, i) => [arr1[i], arr2[i]]).filter(tuple => tuple[0] !== undefined && tuple[1] !== undefined);

export const findMatchingSequenceInTailAndHead = <T>(arrWithMatchingTail: T[], arrWithMatchingHead: T[], isEqual: (a: T, b: T) => boolean) => {
  if (arrWithMatchingTail.length === 0 || arrWithMatchingHead.length === 0) {
    return [];
  }

  const overlapStartIndex = arrWithMatchingTail.findIndex(item => isEqual(item, arrWithMatchingHead[0]));
  const tailOfArr1 = arrWithMatchingTail.slice(overlapStartIndex);
  const isOverlapping = overlapStartIndex >= 0 && zip(tailOfArr1, arrWithMatchingHead).every(([a, b]) => isEqual(a, b));
  if (isOverlapping) {
    return tailOfArr1;
  } else {
    return [];
  }
};

export const findMatchingHeads = <T>(arr1: T[], arr2: T[], isEqual: (a: T, b: T) => boolean = (a, b) => a === b) => {
  const matchingHeadSequence: T[] = [];
  for (let i = 0; i < Math.min(arr1.length, arr2.length); i += 1) {
    if (isEqual(arr1[i], arr2[i])) {
      matchingHeadSequence.push(arr1[i]);
    } else {
      break;
    }
  }

  return matchingHeadSequence;
};
