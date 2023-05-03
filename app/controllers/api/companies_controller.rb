class Api::CompaniesController < ApplicationController
    def index 
        render json: Company.all, status: :ok
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
