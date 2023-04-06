Rails.application.routes.draw do
  namespace :api do
    resources :sand_useds, only: [:index, :create]
    resources :trucks, only: [:index, :create]
    resources :sites, except: [:show]
    resources :users

    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    post '/login', to: 'sessions#create'
    delete '/logout', to: "sessions#destroy"
    post '/reset', to: "users#reset_password"
    patch "/user_employee_update/:id", to: 'users#update_employee'
    get '/completed_sites', to: 'sites#completed_index'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
