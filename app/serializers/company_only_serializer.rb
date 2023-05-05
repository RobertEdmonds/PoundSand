class CompanyOnlySerializer < ActiveModel::Serializer
    attributes :name 

    has_many :sites
end