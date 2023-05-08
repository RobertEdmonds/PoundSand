class Api::SitesController < ApplicationController
    before_action :authorize_user
    before_action :set_site, only: [:update, :show, :destroy]

    def index
        sites = Site.where(completed: false)
        render json: sites, status: :ok
    end

    def completed_index
        sites = Site.where(completed: true)
        render json: sites, status: :ok
    end

    def show 
        render json: @site, status: :ok 
    end

    def create 
        site = Site.create!(site_params)
        site.update(start_date: Date.current())
        render json: site, status: :created 
    end

    def update
        @site.update!(site_status_params)
        render json: @site, status: :created
    end

    def destroy 
        @site.destroy
        head :no_content
    end

    private 

    def site_params
        params.permit(:location, :crew, :company_id)
    end

    def site_status_params 
        params.permit(:completed, :trash_sand)
    end

    def set_site 
        @site = Site.find(params[:id])
    end

    def authorize_user
        user_can_modify = current_user
        if !user_can_modify
            render json: { error: "You don't have permission to perform that action" }, status: :forbidden
        end
    end
            
end
