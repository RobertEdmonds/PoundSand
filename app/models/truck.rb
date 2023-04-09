class Truck < ApplicationRecord
    belongs_to :site 

    validates :truck, :mine, :tare_weight, :gross_weight, :ship_to, :po, {presence: true}
    validate :right_weight

    def right_weight
        if self.gross_weight == 0
            errors.add(:gross_weight, "cannot equal zero")
        elsif self.tare_weight == 0
            errors.add(:tare_weight, "cannot equal zero")
        elsif self.gross_weight <= self.tare_weight
            errors.add(:gross_weight, "must weigh more than tare weight")
        end
    end

end
