Rails.application.routes.draw do
  root to: "root#root"

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]
end
