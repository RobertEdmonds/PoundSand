class SandUsed < ApplicationRecord
    belongs_to :site

    validates :pounds, :stage, :date, :moisture, {presence: true}
    validate :right_time 

    def right_time
        if !self.date.after?(self.sites.start_time)
        errors.add(:date, "must be later than start of this site")
        end
    end
end
