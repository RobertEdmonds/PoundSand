class Api::SessionController < ApplicationController
    skip_before_action :authorize, only: [:create] 

    def create 
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            user.update(log_number: (user.log_number + 1)) 
            render json: user, status: :created 
        else
            render json: {errors: ["Password or Email doesn't match our file"]}, status: :unauthorized
        end
    end

    def destroy 
        session.delete :user_id
        head :no_content
    end
end
