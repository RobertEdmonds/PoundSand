class SandUsed < ApplicationRecord
    belongs_to :site

    validates :pounds, :stage, :moisture, {presence: true}
    
end
