class User < ApplicationRecord
    validates :name, :username, :password_digest, {presence: true, uniquness: true}
end
