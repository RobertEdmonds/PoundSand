class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :boss, :log_number
end
