class Truck < ApplicationRecord
    belongs_to :site 

    validates :truck, :mine, :date, :tare_weight, :gross_weight, :ship_to, :po, {presence: true}
end
