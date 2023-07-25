class AddActiveColumnToCompany < ActiveRecord::Migration[7.0]
  def change
    add_column :companies, :active, :boolean, default: true
  end
end
