import React, { useEffect, useState, useCallback } from "react";

import { Redirect } from "react-router-dom";

const useRedirect = (dispatchAction, funcArguments, path = "/") => {
  const [redirectUser, setRedirectUser] = useState(false);
  //prevents action from being called infinitely when component using hook renders
  const [isActionDispatched, setIsActionDispatched] = useState(false);

  const resetIsActionDispatched = useCallback(
    () => setIsActionDispatched(false),
    []
  );

  useEffect(() => {
    if (isActionDispatched) return;
    dispatchAction(...funcArguments, () => {
      setRedirectUser(true);
    });
    setIsActionDispatched(true);
  }, [dispatchAction, funcArguments, isActionDispatched]);

  return redirectUser
    ? {
        redirectComponent: <Redirect to={path} />,
        resetIsActionDispatched
      }
    : { redirectComponent: null, resetIsActionDispatched };
};

export default useRedirect;
