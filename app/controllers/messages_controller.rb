class MessagesController < ApplicationController
  layout 'instagram_layout'

  def read
    id = params[:id]
    message = Message.find(id)
    unless message.status
      message.update(status: Time.now)
      render json: message, status: 200
    end
  end

  def index
    respond_to do |format|
      format.html do
      end
      format.json do
        messages = Message.where(sender_id: current_user.id).or(Message.where(receiver_id: current_user.id)).order(created_at: :asc)
        rooms = {}
        chat_partners = {}
        messages.each do |message|
          sender_id = message.sender_id
          receiver_id = message.receiver_id
          room_key = sender_id + receiver_id - current_user.id

          if rooms[room_key].nil?
            rooms[room_key] = [message]
          else
            rooms[room_key].push(message)
          end
          chat_partner = if sender_id == current_user.id
                           message.receiver.username
                         else
                           message.sender.username
                         end
          chat_partners[chat_partner] = room_key
        end

        render json: { rooms:, chat_partners: },
               status: 200
      end
    end
  end

  def create
    @message = Message.new(message_params)
    @message.sender_id = current_user.id
    you_were_blocked = Block.find_by(blocker_id: @message.receiver_id, blocked_id: @message.sender_id)
    you_are_blocking = Block.find_by(blocked_id: @message.receiver_id, blocker_id: @message.sender_id)

    if you_were_blocked || you_are_blocking
      error_message = 'Sorry, you were blocked' if you_were_blocked
      error_message = 'Sorry, please remove your block' if you_are_blocking
      return render json: { error_message: }, status: 403
    end

    @message.save!
    render json: @message, status:
  end

  def message_params
    params.require(:message).permit(:content, :receiver_id)
  end
end
