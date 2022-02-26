Rails.application.routes.draw do
  
  resources :comments
  resources :forum_posts
  resources :subforums
  resources :forums
  resources :residencies
  resources :addresses
  resources :artist_resources
  resources :listing_images
  resources :listings
  resources :profile_pictures
  # resources :users, only: [:index, :show, :create]
  resources :posts, only: [:index, :create]

  post "/signup", to: "users#create"
  get "/me", to: "users#me"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
