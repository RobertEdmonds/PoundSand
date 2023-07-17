class Site < ApplicationRecord
    has_many :trucks, dependent: :destroy
    has_many :sand_useds, dependent: :destroy

    validates :location, presence: true
    validates :crew, presence: true
    validates :company_id, presence: true
    validates :po, uniqueness: true, presence: true
    validates :correction, :numericality => { greater_than_or_equal_to: -15, less_than_or_equal_to: 15 }
    validates :est_total, :numericality => { greater_than_or_equal_to: 0 }

    def self.find_by_upcased_location(location)
        find_by('UPPER(location) = ?', location.upcase)
    end
    
end
