Rails.application.routes.draw do
  root "pages#index"

  resource :location, only: [:show]
  resources :cats, only: [:index, :new, :create]
end
