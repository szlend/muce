class Cat < ApplicationRecord
  mount_uploader :image, CatImageUploader
end
