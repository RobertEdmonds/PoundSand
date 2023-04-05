class Api::TrucksController < ApplicationController
    
    def index
        render json: Truck.all, status: :ok
    end

    def create 
       truck = Truck.create!(truck_params)
       truck.update!(total: (truck.gross_weight - truck.tare_weight), date: "2022-03-05") 
       site = Site.find_by(id: truck.site_id)
       site.update(total_on_site: (site.total_on_site + truck.total))
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
