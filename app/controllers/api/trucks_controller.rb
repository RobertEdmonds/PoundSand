class Api::TrucksController < ApplicationController
    def index
        render json: Truck.all, status: :ok
    end

    def create 
       truck = Truck.create!(truck_params)
       truck.update!(total: (truck.gross_weight - truck.tare_weight)) 
       site = Site.find(params[:site_id])
       site.update(total_on_site: (site.total_on_site + truck.total))
       render json: truck, status: :created
    end

    private

    def truck_params
        params.permit(:truck, :mine, :date, :tare_weight, :gross_weight, :ship_to, :po)
    end
end
