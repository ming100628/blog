class DashboardController < ApplicationController
    def index
        if !current_user
            flash[:errors] = ["You have not logged in yet."]
            redirect_to "/login"
        elsif current_user.admin?
            @articles = Article.all
        elsif current_user
            @articles = Article.where(user_id: current_user.id)
        end
    end
end
