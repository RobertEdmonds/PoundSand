class Api::UsersController < ApplicationController

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id 
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

    def update_employee
        user = User.find(params[:id])
        user.update(update_employee_params)
        render json: user, status: :created 
    end

    private

    def user_params
        params.permit(:name, :username, :password, :password_confirmation)
    end

    def user_password_params
        params.permit(:password, :password_confirmation, :log_number)
    end

    def update_employee_params 
        params.permit(:boss)
    end
end
