class ApplicationController < ActionController::API
    include ActionController::Cookies 
    before_action :authorize 
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity 

    private 

    def current_user 
        @current_user ||= User.find_by(id: session[:user_id])
    end

    def current_company_user 
        @company_user ||= CompanyUser.find_by(id: session[:company_user_id])
    end

    def authorize
        if(@current_user)
            return render json: { errors: ["Not authorized user"] }, status: :unauthorized unless current_user
        elsif(@company_user)
            return render json: { errors: ["Not authorized user"]}, status: :unauthorized unless current_company_user
        end
    end

    def render_unprocessable_entity(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity 
    end 
end
