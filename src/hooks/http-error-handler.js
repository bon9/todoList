import { useState, useEffect } from "react";

export default httpClient => {
  const [error, setError] = useState("");
  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  });

  const reqInterceptor = httpClient.interceptors.request.use(req => {
    setError("");
    return req;
  });
  // интересует только второй аргумент

  const resInterceptor = httpClient.interceptors.response.use(
    res => res,
    err => {
      setError(err);
    }
  );

  const errorConfirmedHandler = () => {
    setError("");
  };
  return [error, errorConfirmedHandler];
};
