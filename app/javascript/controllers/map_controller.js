import { Controller } from "stimulus";
import * as LocationService from "services/location_service";

import PinIcon from "assets/images/map/pin.png";

function NewCatControl(controlDiv, map) {
  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '2px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'New cat';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    Turbolinks.visit("/cats/new");
  });
}

export default class extends Controller {
  // static targets = ["map"];

  connect() {
    this.map = new google.maps.Map(this.element, {
      gestureHandling: "greedy",
      mapTypeControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true,
      zoom: 5,
      center: {lat: 0, lng: 0}
    });

    this.newCatControlDiv = document.createElement('div');
    this.newCatControl = new NewCatControl(this.newCatControlDiv, this.map);

    this.newCatControlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(this.newCatControlDiv);

    this.setOverviewPosition();
    this.resolveApproximatePosition();
    this.resolveAccuratePosition();
    this.getCats()
  }

  getCats() {
    fetch("/cats")
      .then(response => response.json())
      .then(cats => {
        for (let cat of cats) {
          const infoWindow = new google.maps.InfoWindow({
            content:
              `<h1>${cat.name}</h1>` +
              `<p>${cat.description}</p>` +
              `<div><a href="/cats/${cat.id}"><img src="${cat.image.thumb.url}" style="max-width: 300px"/></a></div>` +
              `<a href="/cats/${cat.id}">View profile</a>`
          });

          const marker = new google.maps.Marker({
            position: {lat: cat.latitude, lng: cat.longitude},
            map: this.map,
            title: cat.name,
            icon: {url: PinIcon, scaledSize: new google.maps.Size(32, 50)}
          });

          marker.addListener("click", () => infoWindow.open(this.map, marker));
        }
      });
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
  }

  setApproximatePosition({lat, lng}) {
    this.map.panTo({lat, lng});
    this.map.setZoom(10);
  }

  setOverviewPosition() {
    const position = {lat: 0, lng: 0};
    this.map.panTo(position);
    this.map.setZoom(5);
  }
}
