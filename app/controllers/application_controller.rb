class ApplicationController < ActionController::Base
#   http_basic_authenticate_with name: "user_1", password: "password"
    before_action :update_visitor_counter
    helper_method :current_user
    skip_forgery_protection
    def current_user
        User.find_by(token: cookies['secret'])
    end

    def update_visitor_counter
        VisitorCounter.create(user_agent: request.user_agent, ip: request.ip)
         # if 1.day.ago > VisitorCounter.where(ip: "::1").last.created_at                                                               
    end
end
