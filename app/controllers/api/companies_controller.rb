class Api::CompaniesController < ApplicationController
    before_action :authorize_user, only: [:create]
    before_action :authorize_user_view, only: [:index]

    def index 
        render json: Company.all, status: :ok
    end

    def company_index
        sites = Company.where(id: params[:id])
        render json: sites, each_serializer: CompanyOnlySerializer
    end

    def create 
        company = Company.create!(company_params)
        render json: company,status: :created 
    end

    private

    def company_params
        params.permit(:name, :code)
    end

    def authorize_user
        user_found = current_user.boss?
        if !user_found
            render json: { error: "You don't have permission to perform that action" }, status: :forbidden
        end
    end

    def authorize_user_view
        user_found = current_user
        if !user_found
            render json: { error: "You don't have permission to perform that action" }, status: :forbidden
        end
    end

end
