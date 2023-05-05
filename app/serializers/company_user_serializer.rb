class CompanyUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :code
  has_one :company
end
