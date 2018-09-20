require 'net/http'

module GeoipService
  API_ENDPOINT = URI("http://ip.nightwatch.io/")

  module_function

  def resolve(ip)
    Net::HTTP.start(API_ENDPOINT.host, API_ENDPOINT.port) do |http|
      res = http.head(API_ENDPOINT.path, { "X-Forwarded-For" => ip })
      latitude, longitude = res["x-geo-latitude"], res["x-geo-longitude"]
      return nil unless latitude && longitude

      { lat: latitude&.to_f, lng: longitude&.to_f }
    end
  end
end
