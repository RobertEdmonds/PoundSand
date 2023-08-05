class Api::SandUsedsController < ApplicationController
    before_action :authorize_view_user, only: [:index]
    before_action :authorize_user, only: [:create, :update, :destroy]

    def index
        render json: SandUsed.all, status: :ok
    end

    def create 
        sand_used = SandUsed.create!(sand_used_params)
        site = Site.find(sand_used.site_id)
        site.update!(total_sand_used: (site.total_sand_used + sand_used.pounds), total_on_site: (site.total_on_site - sand_used.pounds))
        sand_array = SandUsed.where(site_id: site.id).select {|found| found.date.to_date == sand_used.date.to_date }
        if sand_array.length() > 1 
            total = 0
            sand_array.map { |sand| total += sand.pounds }
            sand_used.update!(total_amount_per_day: total)
        else
            sand_used.update!(total_amount_per_day: sand_used.pounds)
        end
        render json: sand_used, status: :created
    end

    def update 
        sand_used = SandUsed.find(params[:id])
        site = Site.find(sand_used.site_id)
        site.update!(total_sand_used: (site.total_sand_used - sand_used.pounds), total_on_site: (site.total_on_site + sand_used.pounds))
        sand_used.update!(update_sand_params)
        site.update!(total_sand_used: (site.total_sand_used + sand_used.pounds), total_on_site: (site.total_on_site - sand_used.pounds))
        sand_array = SandUsed.where(site_id: site.id).select {|found| found.date.to_date == sand_used.date.to_date }
        if sand_array.length() > 1
            total = 0
            sand_array.map { |sand| total += sand.pounds }
            sand_used.update!(total_amount_per_day: total)
            sand_array.sort_by(&:created_at).last.update!(total_amount_per_day: total)
        else
            sand_used.update!(total_amount_per_day: sand_used.pounds)
        end
        render json: sand_used, status: :created 
    end

    def destroy
        sand_used = SandUsed.find(params[:id])
        site = Site.find(sand_used.site_id)
        site.update(total_on_site: (site.total_on_site + sand_used.pounds), total_sand_used: (site.total_sand_used - sand_used.pounds))
        sand_array = SandUsed.where(site_id: site.id).select {|found| found.date.to_date == sand_used.date.to_date }
        if sand_array.length() > 1
            sand_array.last.update!(total_amount_per_day: (sand_array.last.total_amount_per_day - sand_used.pounds))
        end
        sand_used.destroy 
        head :no_content
    end


    private

    def sand_used_params
        params.permit(:pounds, :stage, :moisture, :site_id, :date)
    end

    def update_sand_params 
        params.permit(:id, :pounds, :stage, :moisture, :date, :site_id)
    end

    def authorize_user
        user_found = current_user
        if !user_found
            render json: { error: "You don't have permission to perform that action" }, status: :forbidden
        end
    end

    def authorize_view_user 
        user_found = current_company_user || current_user
        if !user_found
            render json: { error: "You don't have permission to perform that action" }, status: :forbidden
        end
    end

end
