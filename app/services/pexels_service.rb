class PexelsService
  # attr_accessor :client

  def initialize
    @client = Pexels::Client.new(Rails.application.credentials.pexels_api_key)
  end

  def client
    @client
  end
end
