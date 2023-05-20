class Api::SitesController < ApplicationController
    before_action :authorize_user, except: [:show]
    before_action :authorize_company_user, only: [:show]
    before_action :set_site, only: [:update, :show, :destroy, :update_correction]

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
        if(site_status_params[:trash_sand] > 0)
            @site.update!(trash_sand: (@site.trash_sand + site_status_params[:trash_sand]), total_on_site: (@site.total_on_site - site_status_params[:trash_sand]))
        else
            @site.update!(site_status_params)
        end
        render json: @site, status: :created
    end

    def update_correction
        @site.update!(site_correction_params)
    end

    # def destroy 
    #     @site.destroy
    #     head :no_content
    # end

    private 

    def site_params
        params.permit(:location, :crew, :company_id)
    end

    def site_status_params 
        params.permit(:completed, :trash_sand)
    end

    def site_correction_params 
        params.permit(:correction)
    end

    def set_site 
        @site = Site.find(params[:id])
    end

    def authorize_user
        user_found = current_user
        if !user_found
            render json: { error: "You don't have permission to perform that action" }, status: :forbidden
        end
    end

    def authorize_company_user 
        user_found = current_company_user
        if !user_found
            render json: { error: "You don't have permission to perform that action" }, status: :forbidden
        end
    end
            
end
