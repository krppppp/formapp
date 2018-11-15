Rails.application.routes.draw do



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users, :controllers => {
      :registrations => 'users/registrations',
      :sessions => 'users/sessions'
  }
  devise_scope :user do
    authenticated :user do
      root :to => 'tops#index'
    end
    unauthenticated :user do
      root :to => 'devise/registrations#new', as: :unauthenticated_root
    end
  end

  resources :users, except: [:new, :create] do
  end

  get "/index", to:"templates#index", as:"templates"
  for i in 0..32 do
    get ":id/#{i}", to: "users#p#{i}", as: "users_p#{i}"
  end


  resources :tops

  # subscriptions
  #
  resources :subscriptions, only: %i(new create index destroy show), controller: 'subscriptions'

  post "pay", to: "users#pay"
  post "pay2", to: "users#pay2"

end
