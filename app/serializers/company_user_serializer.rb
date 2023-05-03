class CompanyUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :password_digest
  has_one :company
end
