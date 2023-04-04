class AddColumnToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :log_number, :integer, default: 0
  end
end
