import { Controller } from "stimulus";
import { Collapse } from "bootstrap.native/dist/bootstrap-native-v4";

export default class extends Controller {
  connect() {
    new Collapse(this.element);
  }
}
