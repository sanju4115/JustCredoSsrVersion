export default function({ store, redirect, route }) {
    store.getters["login/user"] != null && route.name == 'login' ? redirect('/') : ''
    store.getters["login/user"] == null && isAdminRoute(route) ? redirect('/login') : ''
  }
  
  function isAdminRoute(route) {
    if (route.matched.some(record => record.path == '/admin')) {
      return true
    }
  }
  