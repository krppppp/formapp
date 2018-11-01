Rails.application.routes.draw do
  root to: 'tops#index'

  get "/index", to:"templates#index", as:"templates"

  for i in 0..32 do
    get ":name/#{i}/トップ", to: "templates#p#{i}", as: "templates_#{i}"
  end

  resources :tops
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, :controllers => {
      :registrations => 'users/registrations',
      :sessions => 'users/sessions'
  }
  resources :users, except: [:new, :create] do
  end
  # subscriptions
  #
  resources :subscriptions, only: %i(new create index destroy show), controller: 'subscriptions'

  post "pay", to: "templates#pay"

end
