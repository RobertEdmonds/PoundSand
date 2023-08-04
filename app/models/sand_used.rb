class SandUsed < ApplicationRecord
    belongs_to :site

    validates :pounds, presence: true, comparison: { greater_than: 0, less_than_or_equal_to: 19998000 }
    validates :stage, :site_id, :date, {presence: true}
    validates :moisture, presence: true, :numericality => { greater_than_or_equal_to: 0, less_than_or_equal_to: 15 }
    
end
