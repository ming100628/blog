class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'

  validates :content, presence: true

  after_create :broadcast_message

  def broadcast_message
    ActionCable.server.broadcast("messages:#{receiver.id}", self)
  end
end
