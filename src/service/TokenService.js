const LOCALSTORAGE_KEY = 'cine_token';

export default class TokenService {
  static save(token) {
    localStorage.setItem(LOCALSTORAGE_KEY, token);
  }

  static get() {
    return localStorage.getItem(LOCALSTORAGE_KEY);
  }

  static delete() {
    return localStorage.removeItem(LOCALSTORAGE_KEY);
  }
}
