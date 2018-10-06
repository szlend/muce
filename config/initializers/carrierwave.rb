if Rails.env.production?
  fog_provider = ENV.fetch('FOG_PROVIDER')&.downcase
  fog_directory = ENV.fetch('FOG_DIRECTORY')
  google_storage_access_key_id = ENV.fetch('GOOGLE_STORAGE_ACCESS_KEY_ID')
  google_storage_secret_access_key = ENV.fetch('GOOGLE_STORAGE_SECRET_ACCESS_KEY')

  CarrierWave.configure do |config|
    config.fog_provider = "fog/#{fog_provider}"
    config.fog_directory = fog_directory
    config.fog_public = true
    config.fog_attributes = { 'Cache-Control' => 'max-age=31536000' }
    config.fog_credentials = {
      provider: fog_provider,
      google_storage_access_key_id: google_storage_access_key_id,
      google_storage_secret_access_key: google_storage_secret_access_key
    }

    config.root = Rails.root.join('tmp')
    config.cache_dir = 'carrierwave'
    config.storage = :fog
  end
end
