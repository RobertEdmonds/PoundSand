class Site < ApplicationRecord
    has_many :trucks, dependent: :destroy
    has_many :sand_useds, dependent: :destroy

    validates :location, presence: true
    validates :crew, presence: true

    def self.find_by_upcased_location(location)
        find_by('UPPER(location) = ?', location.upcase)
    end
    
end
