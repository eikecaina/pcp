import * as React from "react";

export function useCustomLogic() {
  const [state, setState] = React.useState({
    value: "initial",
  });

  React.useEffect(() => {
    const timeoutId = setTimeout(() => setState({ value: "changed" }), 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return state;
}
