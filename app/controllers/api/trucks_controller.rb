class Api::TrucksController < ApplicationController
    before_action :authorize_view_user, only: [:index]
    before_action :authorize_user, only: [:create, :update]

    def index
        render json: Truck.all, status: :ok
    end

    def create 
       truck = Truck.create!(truck_params)
       truck.update!(total: (truck.gross_weight - truck.tare_weight), date: Date.current()) 
       site = Site.find_by(id: truck.site_id)
       site.update(total_on_site: (site.total_on_site + truck.total + 32599), total_delivered: (site.total_delivered + truck.total))
        if Truck.where(date: truck.date).length() > 1 && Truck.where(site_id: site.id).length() > 1 
            truck_list = Truck.where(date: truck.date, site_id: site.id)
            truck_mine_list = Truck.where(date: truck.date, site_id: site.id, mine: truck.mine)
            if truck_mine_list.length() > 1
                mine_total = 0
                truck_mine_list.map { |trk| mine_total += trk.total}
                truck.update!(mine_total_per_day: mine_total)
            else
                truck.update!(mine_total_per_day: truck.total)
            end
            total = 0
            truck_list.map { |trk| total += trk.total}
            truck.update!(total_amount_per_day: total)
        else
            truck.update!(total_amount_per_day: truck.total, mine_total_per_day: truck.total)
        end
       render json: truck, status: :created
    end

    def update
        truck = Truck.find(params[:id])
        firstSite = Site.find(truck.site_id)
        firstSite.update!(total_on_site: (firstSite.total_on_site - truck.total), total_delivered: (firstSite.total_delivered - truck.total))
        truck.update!(truck_params)
        truck.update!(total: (truck.gross_weight - truck.tare_weight))
        if firstSite.location.upcase == truck.ship_to.upcase
            firstSite.update!(total_on_site: (firstSite.total_on_site + truck.total), total_delivered: (firstSite.total_delivered + truck.total))
            if Truck.where(date: truck.date).length() >= 2 && Truck.where(site_id: firstSite.id).length() >= 2 
                truck_list = Truck.where(date: truck.date, site_id: firstSite.id)
                total = 0
                truck_list.map { |trk| total += trk.total}
                truck.update!(total_amount_per_day: total)
            else
                truck.update!(total_amount_per_day: truck.total)
            end
        else
            secondSite = Site.find_by_upcased_location(truck.ship_to)
            truck.update!(site_id: secondSite.id)
            secondSite.update(total_on_site: (secondSite.total_on_site + truck.total), total_delivered: (secondSite.total_delivered + truck.total))
            if Truck.where(date: truck.date).length() > 1 && Truck.where(site_id: secondSite.id).length() > 1 
                truck_list = Truck.where(date: truck.date, site_id: secondSite.id)
                total = 0
                truck_list.map { |trk| total += trk.total}
                truck.update!(total_amount_per_day: total)
            else
                truck.update!(total_amount_per_day: truck.total)
            end
        end
        render json: truck, status: :created
    end

    def destroy
        truck.find(params[:id])
        head :no_content
    end

    private

    def truck_params
        params.permit(:id, :truck, :mine, :ticket_number, :tare_weight, :gross_weight, :ship_to, :po, :site_id)
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
