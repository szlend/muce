import { Controller } from "stimulus";
import { Dropdown } from "bootstrap.native/dist/bootstrap-native-v4";

export default class extends Controller {
  connect() {
    new Dropdown(this.element);
  }
}
