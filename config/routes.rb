Rails.application.routes.draw do
  namespace :api do
    resources :sand_useds, only: [:index, :create, :destroy]
    resources :trucks, only: [:index, :create, :update]
    resources :sites
    resources :users, only: [:index]
    # resources :company_users
    resources :companies, only: [:create, :index]

    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    delete '/employee_delete/:id', to: 'users#employee_delete'
    get '/company_personnel', to: 'company_users#show'
    post '/company_personnel_sign_up', to: 'company_users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: "sessions#destroy"
    post '/reset/:id', to: "users#reset_password"
    patch "/user_employee_update/:id", to: 'users#employee_change'
    get '/completed_sites', to: 'sites#completed_index'
    patch '/reset_password/:id', to: 'users#admin_reset_password'
    get '/company_sites/:id', to: 'companies#company_index'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
