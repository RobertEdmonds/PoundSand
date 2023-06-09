class AddColumnTicketToTruck < ActiveRecord::Migration[7.0]
  def change
    add_column :trucks, :ticket_number, :string
  end
end
