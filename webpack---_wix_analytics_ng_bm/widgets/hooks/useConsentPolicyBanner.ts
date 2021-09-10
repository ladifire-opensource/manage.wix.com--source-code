import { useState } from 'react';
import { useMount } from 'react-use';

import { useService } from 'modules/services';

export function useConsentPolicyBanner(): boolean {
  const [isEnabled, setIsEnabled] = useState<boolean>(null);
  const { getIsAppEnabled } = useService('consentPolicyBanner');

  useMount(() => {
    void (async () => {
      const value = await getIsAppEnabled();

      setIsEnabled(value);
    })();
  });

  return isEnabled;
}
