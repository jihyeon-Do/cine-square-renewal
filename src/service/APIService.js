export default class APIService {
  static PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';
  static AWSAPI = 'http://cinesquare.slowtuttle.co.kr:9096';
  // static LOCALAPI = 'http://192.168.104.90:8080';
  static LOCALAPI = 'http://3.38.64.130:8080';
}
