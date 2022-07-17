
class ArticlesController < ApplicationController
    def index
      
      @articles = Article.all
    end
  
    def show
      @article = Article.find(params[:id])
    end
  
    def new
      @article = Article.new
    end

    def a

    end
  
    def create
      @article = Article.new(article_params)
      @article.status = 'archived'
      @article.user = current_user
      
      if @article.save
        redirect_to @article
      else
        @errors = @article.errors.full_messages
        render :new
        
      end
    end

    def destroy
      Article.find(params[:id]).destroy
      redirect_to '/articles'
    end


  def edit
    @article = Article.find(params[:id])
  end

  def update
    @article = Article.find(params[:id])

    if @article.update(article_params)
      redirect_to @article
    else
      render :edit
    end
  end
  
    private
      def article_params
        params.require(:article).permit(:title, :body)
      end
  end
  
