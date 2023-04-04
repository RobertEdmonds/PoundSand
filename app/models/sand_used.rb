class SandUsed < ApplicationRecord
    belongs_to :site

    validates :pounds, :stage, :date, :moisture, {presence: true}
    validate :right_time 

    def right_time
        if !self.date.after?(self.sites.start_time)
        errors.add(:start_time, "must be earlier than end time")
        end
    end
end
