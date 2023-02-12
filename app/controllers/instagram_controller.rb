class InstagramController < ApplicationController
  layout 'instagram_layout'
  before_action :ensure_login, except: [:login_page]
  def index; end

  def login_page; end

  def ensure_login
    redirect_to '/instagram/login_page' if current_user.nil?
  end
end
