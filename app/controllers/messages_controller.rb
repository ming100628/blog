class MessagesController < ApplicationController
  layout 'instagram_layout'
  def index
    respond_to do |format|
      format.html do
      end
      format.json do
        render json: Message.where(sender_id: current_user.id).or(Message.where(receiver_id: current_user.id)).order(created_at: :asc),
               status: 200
      end
    end
  end
end
