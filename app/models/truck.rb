class Truck < ApplicationRecord
    belongs_to :site 

    validates :truck, :mine, :date, :tare_weight, :gross_weight, :ship_to, :po, {presence: true}
    validate :right_weight

    def right_weight
        if self.gross_weight < self.tare_weight
            errors.add(:gross_weight, "must weigh more than tare weight")
        end
    end
end
