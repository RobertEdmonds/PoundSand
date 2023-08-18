class Truck < ApplicationRecord
    belongs_to :site 

    validates :truck, :mine, :time, :tare_weight, :gross_weight, :ship_to, :po, {presence: true}
    validates :ticket_number, uniqueness: {scope: [:mine], message: "already has been used for this mine"}
    validate :right_weight
    validate :po_check, on: :create

    private

    def right_weight
        if self.gross_weight == 0 || self.gross_weight == nil 
            errors.add(:gross_weight, "cannot equal zero")
        elsif self.tare_weight == 0 || self.tare_weight == nil
            errors.add(:tare_weight, "cannot equal zero")
        elsif self.gross_weight <= self.tare_weight
            errors.add(:gross_weight, "must weigh more than tare weight")
        end
    end

    def po_check 
       site = Site.find(self.site_id)
       if site.po != self.po
        errors.add(:po, 'does not match site')
       end
    end

end
