class Api::SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create] 

    def create 
        user = User.find_by(username: params[:username])
        company_user = CompanyUser.find_by(username: params[:username])
        if user&.authenticate(params[:password]) 
            session[:user_id] = user.id
            render json: user, status: :created 
        elsif company_user&.authenticate(params[:password])
            session[:company_user_id] = company_user.id
            render json: company_user, status: :created
        else
            render json: {errors: ["User or Password doesn't match our system"]}, status: :unauthorized
        end
    end

    def destroy_sessions 
        session.delete :user_id
        session.delete :company_user_id
        head :no_content
    end
end
