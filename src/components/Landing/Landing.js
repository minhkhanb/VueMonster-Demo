import { isLoggedIn, login, logout } from '../../../utils/auth';

export default {
  name: 'app-nav',
  methods: {
    handleLogin() {
      login();
    },
    handleLogout() {
      logout();
    },
    isLoggedIn() {
      return isLoggedIn();
    },
  },
};
