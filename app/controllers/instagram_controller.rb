class InstagramController < ApplicationController
  layout 'instagram_layout'
  before_action :ensure_login, except: [:login_page]
  def index; end

  def search
    urls = PexelsService.new.client.photos.search(params[:search], page: 1, per_page: 10,
                                                                   orientation: :portrait).map do |result|
      result.src['original']
    end
    render json: { results: urls }, status: 200
  end

  def login_page
    redirect_to '/instagram' if current_user
  end

  def ensure_login
    redirect_to '/instagram/login_page' if current_user.nil?
  end
end
