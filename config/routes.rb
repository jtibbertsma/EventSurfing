Rails.application.routes.draw do
  root to: "root#root"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  get "api/events/current", to: "api/events#current", defaults: { format: :json }
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show]
    resources :events, only: [:index, :show]
  end

end
