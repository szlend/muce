class AddImageToCats < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :image, :string
  end
end
