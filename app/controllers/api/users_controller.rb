class Api::UsersController < ApplicationController
    before_action :authorize_user, only: [:employee_change] 

    def index 
        render json: User.all, status: :ok
    end

    def create
        user = User.create!(user_params)
        render json: user, status: :created 
    end

    def show 
        current_user = User.find(session[:user_id])
        render json: current_user
    end

    def update
        user = User.find(session[:user_id])
        user.update(user_params)
        render json: user, status: :created 
    end

    def reset_password
        user = User.find(params[:id])
        user.update(user_password_params)
        user.update(log_number: (user.log_number + 1))
        session[:id] = user.id
        render json: user, status: :created 
    end

    def admin_reset_password 
        user = User.find(params[:id])
        user.update(user_password_params)
        user.update(log_number: (user.log_number + 1))
        render json: @user, status: :created    
    end

    def employee_change
        user = User.find(params[:id])
        user.update(boss: !user.boss)
        render json: user, status: :created 
    end

    private

    def user_params
        params.permit(:name, :username, :password, :password_confirmation)
    end

    def user_password_params
        params.permit(:password, :password_confirmation, :log_number)
    end

    def authorize_user
        user_can_see = current_user.boss?
        render json: { error: "Ah ah ah, you didn't say the magic word" }, status: :forbidden unless user_can_see
    end
end
