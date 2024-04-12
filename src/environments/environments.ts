const baseURL= 'http://127.0.0.1:8000/api/';
const ControlbaseURL= 'http://controller.mylittleasistant.online/api/';

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
  updatePasswordURL: `${baseURL}user/update/password`,
  forgotPasswordURL: `${baseURL}user/recovery/password`,
  getDevicesIndex: `${baseURL}employee/device/index`,
  getUsersIndex: `${baseURL}employee/users/index`,
  changeroleuser: `${baseURL}employee/changerole/`,
  synkdeviceuser:  `${baseURL}user/link/device`,
  Controller:  `${ControlbaseURL}mqtt/`,
  sse: `${baseURL}notification/`,
}
