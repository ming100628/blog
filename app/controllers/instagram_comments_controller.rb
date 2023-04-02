class InstagramCommentsController < ApplicationController
  def create
    photo_id = params[:photo_id]
    user_id = current_user.id
    content = params[:content]
    instagram_comment = InstagramComment.create(photo_id:, user_id:, content:)
    render json: { id: instagram_comment.id, content: instagram_comment.content }
  end
end
