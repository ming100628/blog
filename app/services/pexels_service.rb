class PexelsService
  # attr_accessor :client

  def initialize
    @client = Pexels::Client.new(Rails.application.credentials.pexels_api_key)
  end

  attr_reader :client

  def self.a(search_term)
    PexelsService.new.client.photos.search(search_term, page: 1, per_page: 10,
                                                        orientation: :portrait)
  end
end
