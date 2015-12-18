Rails.application.routes.draw do
  root to: "root#root"

  get 'guest', to: 'guest#guest'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

  namespace :api, defaults: { format: :json } do
    get 'dashboard', to: 'dashboard#dashboard'

    resources :users, only: [:show, :update]
    resources :events, except: [:edit, :new]
    resources :event_joins, only: [:create, :destroy]
    resources :messages, only: [:create, :update, :destroy]
  end

  if Rails.env.development?
    mount RouterVisualizer::Engine, at: "routes"
  end
end
