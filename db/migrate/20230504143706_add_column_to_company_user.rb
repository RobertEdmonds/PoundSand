class AddColumnToCompanyUser < ActiveRecord::Migration[7.0]
  def change
    add_column :company_users, :code, :string
  end
end
