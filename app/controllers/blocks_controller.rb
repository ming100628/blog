class BlocksController < ApplicationController
  def index
    blocks = Block.where(blocker_id: current_user.id)
    render json: blocks, status: 200
  end

  def block
    blocker_id = current_user.id
    Block.find_or_create_by(blocker_id:, blocked_id: params[:blocked_id])
    render json: {}, status: 200
  end

  def delete_block
    blocker_id = current_user.id
    Block.where(blocker_id:, blocked_id: params[:id]).destroy_all
    render json: {}, status: 200
  end
end
