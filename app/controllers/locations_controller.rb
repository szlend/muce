class LocationsController < ApplicationController
  def show
    location = GeoipService.resolve("84.20.236.63")
    # location = GeoipService.resolve(request.remote_ip)

    if location
      render json: location
    else
      render status: :precondition_failed, json: { message: "Could not resolve the IP location" }
    end
  end
end
