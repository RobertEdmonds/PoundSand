class Company < ApplicationRecord
    has_many :sites 
    has_many :company_users

    validates :name, :code, {presence: true, uniqueness: true}
end
