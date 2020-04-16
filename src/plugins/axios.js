
import Vue from 'vue';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const baseURL = process.env.VUE_APP_BASE_URL;
const config = {
  baseURL,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (reqconfig) => reqconfig,
  (error) => Promise.reject(error),
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

Plugin.install = function installPlugin(VueInstance) {
  VueInstance.axios = axiosInstance;
  window.axios = axiosInstance;
  Object.defineProperties(VueInstance.prototype, {
    $axios: {
      get() {
        return axiosInstance;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
