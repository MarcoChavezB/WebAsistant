const baseURL= 'http://backend.mylittleasistant.online:8000/api/';

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
  updatePasswordURL: `${baseURL}user/update/password`,
}
