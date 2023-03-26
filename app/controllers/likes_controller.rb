class LikesController < ApplicationController
  def create
    Like.find_or_create_by(user_id: current_user.id, photo_id: params[:photo_id])
    render json: {}, status: 200
  end

  def destroy
    like = Like.find_by(user_id: current_user.id, photo_id: params[:photo_id])
    like&.destroy
    render json: {}, status: 200
  end
end
