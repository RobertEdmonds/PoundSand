class Api::TrucksController < ApplicationController
    skip_before_action :authorize
    def index
        render json: Truck.all, status: :ok
    end

    def create 
       truck = Truck.create!(truck_params)
       truck.update!(total: (truck.gross_weight - truck.tare_weight)) 
       site = Site.find_by(id: truck.site_id)
       site.update(total_on_site: (site.total_on_site + truck.total))
        if Truck.where(date: truck.date).length() > 1
            truck_list = Truck.where(date: truck.date)
            total = 0
            truck_list.map { |trk| total += trk.total}
            truck.update!(total_amount_per_day: total)
        else
            truck.update!(total_amount_per_day: truck.total)
        end
       render json: truck, status: :created
    end

    def destroy
        truck.find(params[:id])
        head :no_content
    end

    private

    def truck_params
        params.permit(:truck, :mine, :tare_weight, :gross_weight, :ship_to, :po, :site_id)
    end
end
