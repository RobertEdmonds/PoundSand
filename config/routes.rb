Rails.application.routes.draw do
  # mount ActionCable.server => '/cable'

  namespace :api do
    resources :sand_useds, only: [:index, :create, :update, :destroy]
    resources :trucks, only: [:index, :create, :update]
    resources :sites
    resources :users, only: [:index]
    resources :buckets, only: [:index, :create]
    # resources :company_users
    resources :companies, only: [:create, :index, :update]

    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    delete '/employee_delete/:id', to: 'users#employee_delete'
    get '/company_personnel', to: 'company_users#show'
    post '/company_personnel_sign_up', to: 'company_users#create'
    post '/login', to: 'sessions#create'
    delete '/logout', to: "sessions#destroy_sessions"
    post '/reset/:id', to: "users#reset_password"
    patch "/user_employee_update/:id", to: 'users#employee_change'
    patch '/reset_password/:id', to: 'users#admin_reset_password'
    patch '/user_work_site/:id', to: 'users#update_user_site'
    get '/company_sites/:id', to: 'companies#company_index'
    patch '/site_correction/:id', to: 'sites#update_correction'
    patch '/update_site/:id', to: 'sites#site_update'
    get '/mobile_sites', to: 'sites#mobile_index'
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
