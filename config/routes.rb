Rails.application.routes.draw do
  root 'main_pages#index'

  resources :articles do
    resources :comments
  end
  post '/login', to: 'users#signed_in'
  get '/login', to: 'users#login'
  get '/create_user', to: 'users#new'
  post '/create_user', to: 'users#create'
  get '/logout', to: 'users#logout'
  get '/users', to: 'users#index'
  get '/dashboard', to: 'dashboard#index'
  get '/all_articles', to: 'articles#a'
  get '/todos', to: 'todos#index'
  get '/tictactoe', to: 'game#tictactoe'
  get '/snake', to: 'game#snake'
  post '/game/highscore', to: 'game#highscore'
  get '/space_invader', to: 'game#space'
  get '/concentration', to: 'game#concentration'
  get '/mastermind', to: 'game#mastermind'
  get '/games', to: 'game#index'
  get '/dino', to: 'game#dino'
  get '/flappybird', to: 'game#flappybird'
  get '/instagram', to: 'instagram#index'
  get '/instagram/login_page', to: 'instagram#login_page'
  get '/instagram/search', to: 'instagram#search'
  post '/instagram_comments', to: 'instagram_comments#create'
  delete '/instagram_comments/:id', to: 'instagram_comments#destroy'
  get '/messages', to: 'messages#index'
  post '/messages', to: 'messages#create'
  post '/messages/:id/read', to: 'messages#read'
  get '/users/search', to: 'users#search'
  post '/blocks', to: 'blocks#block'
  delete '/blocks/:id', to: 'blocks#delete_block'
  get '/blocks', to: 'blocks#index'

  resources :likes, only: %i[create destroy]
end
