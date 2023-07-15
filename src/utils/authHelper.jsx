let config;

export const setConfig = (configuration) => {
  config = configuration;
};
export const getAppIdentifier = () => {
  return config;
};

export const getCookieIdentifier = () => {
  const { clientName, ProductType, AppName } = getAppIdentifier();
  return `${AppName}${ProductType}${clientName}`;
};

export const getOidcClientId = () => {
  return config?.oidcConfig?.client_id;
};

export const getUser = () => {
  let { oidcConfig } = config;

  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`
  );
  if (!oidcStorage) {
    return null;
  }
  // return User.fromStorageString(oidcStorage);
  return JSON.parse(oidcStorage);
};

export const getToken = () => {
  const user = getUser();
  return user?.access_token;
};

export const getUserAvatarPicture = () => {
  const user = getUser();
  return user?.profile?.picture;
};

export const getUserId = () => {
  const user = getUser();
  return user?.profile?.sub;
};

export const getUserFullName = () => {
  const user = getUser();
  return user?.profile?.name;
};

export const getUserEmail = () => {
  const user = getUser();
  return user?.profile?.email;
};

export const getFileScannerURL = () => {
  return config?.FileScannerUrl;
};

export const getFinancialsURL = () => {
  return `${config?.GatewayApi}/munibonds/financials`;
};
