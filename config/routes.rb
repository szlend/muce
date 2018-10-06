Rails.application.routes.draw do
  root "pages#index"

  resource :location, only: [:show]
  resources :cats, only: [:index, :show, :new, :create, :edit, :update]
end
