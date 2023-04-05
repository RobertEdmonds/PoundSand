class Api::SandUsedsController < ApplicationController
    def index
        render json: SandUsed.all, status: :ok
    end

    def create 
        sand_used = SandUsed.create!(sand_used_params)
        site = Site.find(sand_used.site_id)
        site.update(total_sand_used: (site.total_sand_used + sand_used.pounds), total_on_site: (site.total_on_site - sand_used.pounds))
        if SandUsed.where(date: sand_used.date).length() > 1
            sand_used_list = SandUsed.where(date: sand_used.date)
            total = 0
            sand_used_list.map { |sand| total += sand.pounds }
            sand_used.update!(total_amount_per_day: total)
        else
            sand_used.update!(total_amount_per_day: sand_used.pounds)
        end
        render json: sand_used, status: :created
    end

    private

    def sand_used_params
        params.permit(:pounds, :stage, :moisture, :site_id)
    end

end
