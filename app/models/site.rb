class Site < ApplicationRecord
    # has_many :trucks, dependent: => :destroy
    # has_many :sand_useds, dependent: => :destroy

    validates :location, :start_date, presence: true
    
end
