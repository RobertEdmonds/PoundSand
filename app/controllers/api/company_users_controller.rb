class CompanyUsersController < ApplicationController
    def show 
        company_user = CompanyUser.find(session[:company_user_id])
        render json: company_user, status: :ok 
    end
end
