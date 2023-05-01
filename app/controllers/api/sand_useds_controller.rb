class Api::SandUsedsController < ApplicationController
    def index
        render json: SandUsed.all, status: :ok
    end

    def create 
        sand_used = SandUsed.create!(sand_used_params)
        sand_used.update!(date: Date.current())
        site = Site.find(sand_used.site_id)
        site.update(total_sand_used: (site.total_sand_used + sand_used.pounds), total_on_site: (site.total_on_site - sand_used.pounds))
        if SandUsed.where(date: sand_used.date).length() > 1 && SandUsed.where(site_id: site.id).length() > 1
            sand_used_list = SandUsed.where(date: sand_used.date, site_id: site.id)
            total = 0
            sand_used_list.map { |sand| total += sand.pounds }
            sand_used.update!(total_amount_per_day: total)
        else
            sand_used.update!(total_amount_per_day: sand_used.pounds)
        end
        render json: sand_used, status: :created
    end

    # def update
    #     sand_used = SandUsed.find(params[:id])
    #     firstSite = Site.find(sand_used.site_id)
    #     firstSite.update(total_on_site: (firstSite.total_on_site - truck.total), total_delivered: (firstSite.total_delivered - truck.total))
    #     sand_used.update!(sand_used_params)
    #     if firstSite.location.upcase == truck.ship_to.upcase
    #         firstSite.update(total_on_site: (firstSite.total_on_site + truck.total), total_delivered: (firstSite.total_delivered + truck.total))
    #     else
    #         secondSite = Site.find_by_upcased_location(truck.ship_to)
    #         truck.update!(site_id: secondSite.id)
    #         secondSite.update(total_on_site: (firstSite.total_on_site + truck.total), total_delivered: (firstSite.total_delivered + truck.total))
    #     end
    #     render json: truck, status: :created
    # end

    def destroy
        sand_used = SandUsed.find(params[:id])
        site = Site.find(sand_used.site_id)
        site.update(total_on_site: (firstSite.total_on_site + sand_used.pounds), total_sand_used: (firstSite.total_sand_used - sand_used.pounds))
        if SandUsed.where(date: sand_used.date).length() > 1 && SandUsed.where(site_id: site.id).length() > 1
            sand_used_list = SandUsed.where(date: sand_used.date, site_id: site.id)
            sand_used_list.last.update!(total_amount_per_day: (sand_used_list.last.total_amount_per_day - sand_used.pounds))
        end
        sand_used.destroy 
        head :no_content
    end


    private

    def sand_used_params
        params.permit(:pounds, :stage, :moisture, :site_id)
    end

end
