
class UsersController < ApplicationController
    def signed_in
        user = User.find_by(username: params[:username])
        if user == nil
            flash[:errors] = ['Username is not found.']
            render 'index'      

        else
    
           if user.check_password(params[:password]) 
                cookies['secret'] = user.token
           end
           redirect_to '/'
        end

    end

    def new
    end
    def logout
        cookies['secret'] = nil
        current_user.update_token if current_user
        redirect_to '/'
    end

    def create
        user = User.create(user_params)
        if user.valid?
            
            UserNotifierMailer.send_signup_email(user).deliver_now
            
            cookies['secret'] = user.token
            redirect_to '/'
        else
            flash[:errors] = user.errors.full_messages
            redirect_to '/create_user'
        end

    end

    private
        def user_params
            params.permit(:username, :password)
        end
end
