class Api::CompaniesController < ApplicationController
    before_action :authorize 
    
    def index 
        render json: Company.all, status: :ok
    end

    def company_index
        sites = Company.where(code: params[:id])
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

end
