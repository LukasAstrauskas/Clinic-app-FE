import { useState } from 'react';

const useToggle = (
  value = false,
): [state: boolean, switchState: () => void] => {
  const [state, setState] = useState<boolean>(value);

  const switchToggle = () => {
    setState((status) => !status);
  };

  return [state, switchToggle];
};

export default useToggle;
