Rails.application.routes.draw do
<<<<<<< Updated upstream
  devise_for :users
=======
  # devise_for :users
  get 'messages/index'
>>>>>>> Stashed changes
  root "messages#index"
  resources :users, only: [:edit, :update]
end
