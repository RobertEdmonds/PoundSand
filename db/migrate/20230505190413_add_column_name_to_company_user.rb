class AddColumnNameToCompanyUser < ActiveRecord::Migration[7.0]
  def change
    add_column :company_users, :name, :string
  end
end
