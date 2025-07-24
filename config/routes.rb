Rails.application.routes.draw do
  
  resources :boroughs, only: [:index, :show ]
  resources :comments
  resources :forum_posts, only: [:index, :show, :create, :destroy]
  resources :subforums, only: [:index, :show, :create, :destroy]
  resources :forums, only: [:index, :show]
  resources :residencies
  resources :addresses, only: [:index, :show ]
  resources :artist_resources, only: [:index, :show ]
  resources :listing_images
  resources :listings, only: [:index, :create, :show, :destroy]
  resources :profile_pictures
  resources :users, only: [:index, :show, :create, :update]
  resources :posts, only: [:index, :create]

  post "/signup", to: "users#create"
  get "/me", to: "users#me"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # API routes for messaging and user status
  namespace :api do
    resources :conversations, only: [:index, :show, :create] do
      member do
        get :messages
        post :messages, to: 'conversations#create_message'
        put :mark_as_read
      end
    end

    resources :messages, only: [:show] do
      member do
        put :mark_as_read
      end
      collection do
        get :unread_count
      end
    end

    resources :users, only: [:show] do
      member do
        put :status, to: 'users#update_status'
      end
      collection do
        get :online
        get 'me/conversations_count', to: 'users#conversations_count'
      end
    end
  end

  # Mount Action Cable server
  mount ActionCable.server => '/cable'

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
