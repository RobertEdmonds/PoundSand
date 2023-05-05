class AddColumnUsernameToCompanyUser < ActiveRecord::Migration[7.0]
  def change
    add_column :company_users, :username, :string
  end
end
