class AddColumnWorkSiteToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :work_site, :integer
    add_column :users, :employee, :boolean
  end
end
