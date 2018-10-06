if ENV['GOOGLE_STORAGE_ENABLED']
  CarrierWave.configure do |config|
    config.root = Rails.root.join('tmp')
    config.cache_dir = 'carrierwave'

    config.fog_credentials = {
      provider: 'Google',
      google_storage_access_key_id: ENV.fetch('GOOGLE_STORAGE_ACCESS_KEY_ID'),
      google_storage_secret_access_key: ENV.fetch('GOOGLE_STORAGE_SECRET_ACCESS_KEY')
    }

    config.fog_directory = ENV.fetch('GOOGLE_STORAGE_BUCKET_NAME')
    config.fog_public = true
    config.fog_attributes = { 'Cache-Control' => 'max-age=31536000' }
  end
end