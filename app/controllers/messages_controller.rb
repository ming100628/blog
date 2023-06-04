class MessagesController < ApplicationController
  layout 'instagram_layout'
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
    @message.save!
  end

  def message_params
    params.require(:message).permit(:content, :receiver_id)
  end
end
