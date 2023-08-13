class UsersController < ApplicationController
  def index
    search_string = params[:search]
    render json: User.select(:username, :id).where('LOWER(username) LIKE ?', "%#{search_string.downcase}%")
  end

  def login; end

  def signed_in
    user = User.find_by(username: params[:username])
    if user.nil?
      flash[:errors] = ['Username is not found.']
      respond_to do |format|
        format.html do
          render 'index'
        end
        format.json do
          render json: { message: 'Wrong password!' }, status: 403
        end
      end
    else
      cookies['secret'] = user.token if user.check_password(params[:password])
      respond_to do |format|
        format.html do
          redirect_to '/'
        end
        format.json do
          render json: {}, status: 200
        end
      end
    end
  end

  def new; end

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

  def search
    results = User.where('lower(username) LIKE ?', "%#{params[:username].downcase}%")
    render json: { results: }, status: 200
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end
