class CatImageUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  process resize_to_limit: [1920, 1920]
  process convert: :jpg

  version :thumb do
    process resize_to_fill: [600, 600]
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def default_url(*args)
    ActionController::Base.helpers.asset_pack_path("images/cat/image/placeholder.png")
  end

  def filename
    "#{digest}.#{file.extension}" if original_filename
  end

  def extension_whitelist
    %w(jpg jpeg gif png webp)
  end

  private

  def digest
    var = :"@#{mounted_as}_digest"
    model.instance_variable_get(var) || begin
      model.instance_variable_set(var, SecureRandom.hex)
    end
  end
end
