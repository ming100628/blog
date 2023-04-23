class InstagramController < ApplicationController
  layout 'instagram_layout'
  before_action :ensure_login, except: [:login_page]
  def index; end

  def search
    results = PexelsService.new.client.photos.search(params[:search], page: params[:page], per_page: 10,
                                                                      orientation: :portrait).instance_variable_get(:@attrs)['photos'].map do |result|
      comments = InstagramComment.where(photo_id: result['id'])
      comments = comments.map do |comment|
        {
          content: comment.content,
          user_id: comment.user_id,
          photo_id: comment.photo_id,
          id: comment.id,
          created_at: comment.created_at,
          username: comment.user.username
        }
      end
      { id: result['id'], url: result['src']['portrait'], photographer: result['photographer'],
        attribute: result['alt'], comments: }
    end
    results = results.map do |r|
      r['liked'] = Like.where(photo_id: r[:id], user_id: current_user.id).exists?
      r['likes'] = Like.where(photo_id: r[:id]).count
      r
    end
    render json: { results: }, status: 200
  end

  def login_page
    redirect_to '/instagram' if current_user
  end

  def ensure_login
    redirect_to '/instagram/login_page' if current_user.nil?
  end
end
