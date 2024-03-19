const LOCALSTORAGE_ACCOUNT_ID = 'account';
const LOCALSTORAGE_NAME = 'user_name';

export default class AccountService {
  static save(account, userName) {
    localStorage.setItem(LOCALSTORAGE_ACCOUNT_ID, account);
    localStorage.setItem(LOCALSTORAGE_NAME, userName);
  }

  static getAccount() {
    return localStorage.getItem(LOCALSTORAGE_ACCOUNT_ID);
  }

  static getUserName() {
    return localStorage.getItem(LOCALSTORAGE_NAME);
  }

  static deleteAccount() {
    return localStorage.removeItem(LOCALSTORAGE_ACCOUNT_ID);
  }

  static deleteUserName() {
    return localStorage.removeItem(LOCALSTORAGE_NAME);
  }
}
