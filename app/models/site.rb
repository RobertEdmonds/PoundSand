class Site < ApplicationRecord
    has_many :trucks, dependent: :destroy
    has_many :sand_useds, dependent: :destroy

    validates :location, presence: true
    
end
