class InstagramController < ApplicationController
  layout 'instagram_layout'
  before_action :ensure_login, except: [:login_page]
  def index; end

  def search


  end

  def login_page
    redirect_to '/instagram' if current_user
  end

  def ensure_login
    redirect_to '/instagram/login_page' if current_user.nil?
  end
end
