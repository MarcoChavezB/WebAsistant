const baseURL= 'http://127.0.0.1:8000/api/';

export const environment ={
  production : false,
  fetchUserDataURL : `${baseURL}user/info`,
  loginURL : `${baseURL}user/login`,
  registerURL : `${baseURL}user/register`,
  googleApiKey: 'AIzaSyAGWRNTQSsmyCpleuJzSJPZb15FDMzaEzQ',
  storeDeviceURL : `${baseURL}employee/store/device`,
  getDeviceDataURL : `${baseURL}employee/device/data/`,
  logoutURL : `${baseURL}user/logout`,
  authenticateURL : `${baseURL}user/authenticatetoken`,
  urladminAuth: `${baseURL}employee/employeeauthenticate`,
  getUserDevice: `${baseURL}user/devices`,
  userUpdateURL: `${baseURL}user/update`,
  codeVerify: `${baseURL}/verifyCode`,
  sendEmailCode: `${baseURL}/getCode/`,
  checkCodeAuth: `${baseURL}/isActive/`,
}
