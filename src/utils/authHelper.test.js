import * as BL from "./authHelper";

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};
describe("authHelper", () => {
  let mockOldData = null;
  beforeEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
    let config = {
      clientName: "A",
      ProductType: "B",
      AppName: "C",
      oidcConfig: { authority: "Admin", client_id: "1243535464" },
      GatewayApi: "gateway",
    };
    BL.setConfig(config);
    const mockId = "oidc.user:Admin:1243535464";
    mockOldData = {
      access_token: "asdudfhkjf_rwjgbwk",
      profile: {
        name: "abcd",
        email: "abcd@abcd.com",
        picture: "abcd.jpeg",
        sub: "abcd",
      },
    };
    window.sessionStorage.setItem(mockId, JSON.stringify(mockOldData));
  });

  it(" setConfig should expose a function", () => {
    expect(BL.setConfig).toBeDefined();
  });

  it("getAppIdentifier should expose a function", () => {
    expect(BL.getAppIdentifier).toBeDefined();
  });

  it("getCookieIdentifier should expose a function", () => {
    expect(BL.getCookieIdentifier).toBeDefined();
  });

  it("getOidcClientId should expose a function", () => {
    expect(BL.getOidcClientId).toBeDefined();
  });

  it("getUser should expose a function", () => {
    expect(BL.getUser).toBeDefined();
  });

  it("getToken should expose a function", () => {
    expect(BL.getToken).toBeDefined();
  });

  it("getUserAvatarPicture should expose a function", () => {
    expect(BL.getUserAvatarPicture).toBeDefined();
  });
  it("getUserId should expose a function", () => {
    expect(BL.getUserId).toBeDefined();
  });

  it("getUserFullName should expose a function", () => {
    expect(BL.getUserFullName).toBeDefined();
  });

  it("getUserEmail should expose a function", () => {
    expect(BL.getUserEmail).toBeDefined();
  });

  it("getFileScannerURL should expose a function", () => {
    expect(BL.getFileScannerURL).toBeDefined();
  });

  it("getFinancialsURL should expose a function", () => {
    expect(BL.getFinancialsURL).toBeDefined();
  });

  it("should get user info from session storage", () => {
    const mockId = "111";
    const mockJson = { data: "json data" };
    setLocalStorage(mockId, mockJson);
    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });

  test("getUser", () => {
    let actual = BL.getUser();
    expect(actual).toEqual(mockOldData);
  });

  test("getToken", () => {
    let actual = BL.getToken();
    expect(actual).toEqual(mockOldData.access_token);
  });

  test("getUserAvatarPicture", () => {
    let actual = BL.getUserAvatarPicture();
    expect(actual).toEqual(mockOldData.profile.picture);
  });

  test("getUserId", () => {
    let actual = BL.getUserId();
    expect(actual).toEqual(mockOldData.profile.sub);
  });

  test("getUserFullName", () => {
    let actual = BL.getUserFullName();
    expect(actual).toEqual(mockOldData.profile.name);
  });

  test("getUserEmail", () => {
    let actual = BL.getUserEmail();
    expect(actual).toEqual(mockOldData.profile.email);
  });

  test("getOidcClientId", () => {
    let config = {
      oidcConfig: { authority: "Admin", client_id: "1243535464" },
    };
    let actual = BL.getOidcClientId();
    expect(actual).toEqual(config.oidcConfig.client_id);
  });

  test("getFileScannerURL", () => {
    let actual = BL.getFileScannerURL();
    expect(actual).toEqual(mockOldData.FileScannerUrl);
  });

  test("getCookieIdentifier", () => {
    let actual = BL.getCookieIdentifier();
    expect(actual).toEqual("CBA");
  });

  test("getFinancialsURL ", () => {
    let actual = BL.getFinancialsURL();
    expect(actual).toEqual("gateway/munibonds/financials");
  });

  test("getUserNotAvailable", () => {
    window.sessionStorage.removeItem("oidc.user:Admin:1243535464");
    let actual = BL.getUser();
    expect(actual).toEqual(null);
  });
});
