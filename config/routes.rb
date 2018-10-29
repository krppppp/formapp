Rails.application.routes.draw do
  root to: 'tops#index'

  resources :tops
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, :controllers => {
   :registrations => 'users/registrations',
   :sessions => 'users/sessions'
  }
end
