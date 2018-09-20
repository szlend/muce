class CatsController < ApplicationController
  def index
    render json: Cat.all
  end

  def new
    @cat = Cat.new
  end

  def create
    @cat = Cat.create!(cat_params)
    redirect_to root_path
  end

private

  def cat_params
    params.require(:cat).permit(:name, :description, :latitude, :longitude)
  end
end
