class AddColumnPoToSite < ActiveRecord::Migration[7.0]
  def change
    add_column :sites, :po, :string
  end
end
