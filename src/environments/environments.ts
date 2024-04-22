const baseURL= 'http://backend.mylittleasistant.online:8000/api/';
const ControlbaseURL= 'http://controller.mylittleasistant.online/api/';

export const environment ={
  urlws: 'backend.mylittleasistant.online:6001',
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
  unsynkdeviceuser:  `${baseURL}user/deslink/device`,
  Controller:  `${ControlbaseURL}mqtt/`,
  tempdata: `${baseURL}Temp/lastfive/`,
  velocidaddata: `${baseURL}vel/lastfive/`,
  gpsdata: `${baseURL}gps/lastone/`,
  pesodata: `${baseURL}peso/lastone/`,
  inclinaciondata: `${baseURL}incli/lastone/`,
  sse: `${baseURL}notification/`,
  pusher: {
    key: `2489eced27769e3a01d1`,
    cluster: `us3`
  },
}
