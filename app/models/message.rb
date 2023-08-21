class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'

  validates :content, presence: true

  after_create :broadcast_message

  def broadcast_message
    message = attributes
    message[:receiver_username] = receiver.username
    message[:sender_username] = sender.username
    ActionCable.server.broadcast("messages:#{receiver.id}", message)
  end
end
