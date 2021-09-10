export const getFormLink = ({
  id,
  instanceId,
}: {
  id: string;
  instanceId: string;
}) => {
  return `https://forms.wix.com/${instanceId}:${id}`;
};
