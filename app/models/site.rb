class Site < ApplicationRecord
    has_many :trucks
    has_many :sand_useds

    validates :location, presence: true
    
end
