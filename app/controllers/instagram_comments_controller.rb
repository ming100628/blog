class InstagramCommentsController < ApplicationController
  def create
    photo_id = params[:photo_id]
    user_id = current_user.id
    content = params[:content]
    instagram_comment = InstagramComment.create(photo_id:, user_id:, content:)
    comments = InstagramComment.where(photo_id:)
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
    render json: comments
  end
end
