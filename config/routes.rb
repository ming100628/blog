
Rails.application.routes.draw do
  root "main_pages#index"

  resources :articles do
    resources :comments
  end
  get '/login', to: 'users#index'
  post '/login', to: 'users#signed_in'
  get '/create_user', to: 'users#new'
  post '/create_user', to: 'users#create'
  get '/logout', to: 'users#logout'
  get '/dashboard', to: 'dashboard#index'
  get '/all_articles', to: 'articles#a'
  get '/todos', to: 'todos#index'
  get '/tictactoe', to: 'game#tictactoe'
  get '/snake', to: 'game#snake'
  post '/game/highscore', to: 'game#highscore'
  get '/space_invader', to: 'game#space' 
end