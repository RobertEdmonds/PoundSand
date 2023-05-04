class CompanyUser < ApplicationRecord
  has_secure_password

  PASSWORD_REQUIREMENTS = /\A
        (?=.{8,}) # At least 8 characters long
        (?=.*\d) # Contain at least one number
        (?=.*[a-z]) # Contain at least one lowercase letter
        (?=.*[A-Z]) # Contain at least one uppercase letter
        (?=.*[[:^alnum:]]) # Contain at least one symbol
        /x
  
  validates :password, format: PASSWORD_REQUIREMENTS, confirmation: true, on: :create

  belongs_to :company
end
