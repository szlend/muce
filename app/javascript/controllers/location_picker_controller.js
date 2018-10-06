import { Controller } from "stimulus";
import * as LocationService from "services/location_service";

export default class extends Controller {
  static targets = ["map", "latitude", "longitude"];

  connect() {
    this.map = new google.maps.Map(this.mapTarget, {
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      zoom: 20,
      center: {lat: 0, lng: 0}
    });

    this.marker = new google.maps.Marker();

    if (this.latitudeTarget.value && this.longitudeTarget.value) {
      this.setPosition({lat: +this.latitudeTarget.value, lng: +this.longitudeTarget.value});
    } else {
      this.setOverviewPosition();
      this.resolveApproximatePosition();
      this.resolveAccuratePosition();
    }

    this.map.addListener("click", this.onClick.bind(this));
  }

  resolveApproximatePosition() {
    let position = LocationService.getCachedPosition();
    if (position) {
      this.setPosition(position);
    } else {
      LocationService.getGeoipPosition().then(position => {
        if (!this.isAccuratePosition()) this.setApproximatePosition(position);
      });
    }
  }

  resolveAccuratePosition() {
    LocationService.getCurrentPosition().then(position => {
      this.setPosition(position);
      LocationService.setCachedPosition(position);
    });
  }

  isAccuratePosition() {
    LocationService.getCachedPosition() ? true : false;
  }

  setPosition({lat, lng}) {
    this.map.panTo({lat, lng});
    this.map.setZoom(17);
    this.marker.setMap(this.map);
    this.marker.setPosition({lat, lng});

    this.latitudeTarget.value = lat;
    this.longitudeTarget.value = lng;
  }

  setApproximatePosition({lat, lng}) {
    this.map.panTo({lat, lng});
    this.map.setZoom(10);
    this.marker.setMap(null);
    this.marker.setPosition({lat, lng});

    this.latitudeTarget.value = "";
    this.longitudeTarget.value = "";
  }

  setOverviewPosition() {
    const position = {lat: 0, lng: 0};
    this.map.panTo(position);
    this.map.setZoom(5);
    this.marker.setMap(null);
    this.marker.setPosition(position);

    this.latitudeTarget.value = "";
    this.longitudeTarget.value = "";
  }

  setMarker({lat, lng}) {
    this.marker.setMap(this.map);
    this.marker.setPosition({lat, lng});

    this.latitudeTarget.value = lat;
    this.longitudeTarget.value = lng;
  }

  onClick(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    this.setMarker({lat, lng});
  }
}
