class CatsController < ApplicationController
  def index
    render json: Cat.all
  end

  def show
    @cat = Cat.find(params[:id])
  end

  def new
    @cat = Cat.new
  end

  def create
    @cat = Cat.create!(cat_params)
    redirect_to cat_path(@cat)
  end

  def edit
    @cat = Cat.find(params[:id])
  end

  def update
    @cat = Cat.find(params[:id])
    @cat.update!(cat_params)
    redirect_to cat_path(@cat)
  end

  private

  def cat_params
    params.require(:cat).permit(:name, :description, :image, :latitude, :longitude)
  end
end
