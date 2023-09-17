class BlocksController < ApplicationController
  def block
    blocker_id = current_user.id
    Block.find_or_create_by(blocker_id:, blocked_id: params[:blocked_id])
  end

  def delete_block
    blocker_id = current_user.id
    Block.where(blocker_id:, blocked_id: params[:blocked_id]).destroy_all
  end
end
