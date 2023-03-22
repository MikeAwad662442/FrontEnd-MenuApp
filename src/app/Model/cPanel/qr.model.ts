/**
 * Export
 * QR InterFace
 */
import { Facility } from './facility.model';
export { QR, FullQR };
// ===== QR ===== //
interface FullQR {
  cQR_Get: [QR];
  cFacilityGet: [Facility];
}
// WIFI:
// T:   ['None', 'WEP', 'WPA', 'WPA2'] ;
// S:   MyNetworkName;
// P:  ThisIsMyPassword;
// H:   true/false    network SSID is hidden
// ;
interface QR {
  id: any;
  // QRwifi: {
  wifiName: string;
  // wifiImage: string;
  wifiPass: string;
  wifiType: string;
  wifiHidden: boolean;
  // };
  // QRserver: {
  serverURL: string;
  // };
}
// WIFI:S:MGN;P:m@g$n2**%;T:WPA;H:false;
/**
   * Parameter	Example	Description
* T = WPA =>	Authentication type; can be WEP or WPA, or 'nopass' for no password. Or, omit for no password.
* S =	myNetwork =>	Network SSID. Required. Enclose in double quotes if it is an ASCII name, but could be interpreted as hex (i.e. "ABCD")
* P = myPass =>	Password, ignored if T is "nopass" (in which case it may be omitted). Enclose in double quotes if it is an ASCII name, but could be interpreted as hex (i.e. "ABCD")
* H =	true =>	Optional. True if the network SSID is hidden.
Order of fields does not matter. Special characters "", ";", "," and ":" should be escaped with a backslash ("") as in MECARD encoding. For example, if an SSID was literally "foo;bar\baz" (with double quotes part of the SSID name itself) then it would be encoded like: WIFI:S:\"foo\;bar\\baz\";;
   */
