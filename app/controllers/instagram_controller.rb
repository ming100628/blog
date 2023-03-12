class InstagramController < ApplicationController
  layout 'instagram_layout'
  before_action :ensure_login, except: [:login_page]
  def index; end

  def search
    results = PexelsService.new.client.photos.search(params[:search], page: 1, per_page: 10,
                                                                      orientation: :portrait).instance_variable_get(:@attrs)['photos'].map do |result|
      { url: result['src']['portrait'], photographer: result['photographer'], attribute: result['alt'] }
    end
    puts results
    render json: { results: }, status: 200
  end

  def login_page
    redirect_to '/instagram' if current_user
  end

  def ensure_login
    redirect_to '/instagram/login_page' if current_user.nil?
  end
end
