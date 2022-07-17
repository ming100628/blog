class UserNotifierMailer < ApplicationMailer
    default :from => 'felixprograms1205@gmail.com'

  # send a signup email to the user, pass in the user object that   contains the user's email address
    def send_signup_email(user)
        @user = user
        mail( :to => @user.username,
        :subject => 'Thanks for signing up for our awful app' )
    end
end
