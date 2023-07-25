class Api::CompanyUsersController < ApplicationController
    skip_before_action :authorize, only: :create

    def show 
        company_user = CompanyUser.find(session[:company_user_id])
        render json: company_user, status: :ok 
    end

    def create
        if(!!Company.find_by(code: company_user_params[:code]))
            company = Company.find_by(code: company_user_params[:code])
            if !company.active
                render json: { errors: ["Company is no longer active"]}, status: :unprocessable_entity 
            else 
                customer = company.company_users.create!(company_user_params)
                session[:company_user_id] = customer.id 
                render json: customer, status: :created 
            end
        else 
            render json: { errors: ["Code does not match a company"]}, status: :unprocessable_entity 
        end
    end

    private 

    def company_user_params
        params.permit(:email, :name, :username, :password, :password_confirmation, :code)
    end

end
