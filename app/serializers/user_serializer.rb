class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :username, :boss, :log_number, :work_site, :employee
end
