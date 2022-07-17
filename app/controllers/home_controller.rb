class HomeController < ApplicationController
    def index
        

        @name = params[:name]
        @article_title = Article.last.title
        @articles = Article.all
    end
end
