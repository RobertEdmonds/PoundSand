class User < ApplicationRecord
    has_secure_password

    PASSWORD_REQUIREMENTS = /\A
        (?=.{8,}) # At least 8 characters long
        (?=.*\d) # Contain at least one number
        (?=.*[a-z]) # Contain at least one lowercase letter
        (?=.*[A-Z]) # Contain at least one uppercase letter
        (?=.*[[:^alnum:]]) # Contain at least one symbol
        /x
    
    validates :name, :username, {presence: true, uniqueness: true}
    validates :password, format: PASSWORD_REQUIREMENTS, confirmation: true
    validates :password_confirmation, presence: true
end
