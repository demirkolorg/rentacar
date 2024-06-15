import { leftMenu } from '../routes/menu';

function getChildTitle(locationName) {
  for (let item of leftMenu) {
    if (item.child) {
      for (let child of item.child) {
        if (child.childlink === locationName) {
          return child.childtitle;
        }
      }
    }
  }
  return "Grifin"; // Eşleşme bulunamazsa null döner
}
export { getChildTitle };
