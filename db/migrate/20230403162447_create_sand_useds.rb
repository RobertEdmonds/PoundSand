class CreateSandUseds < ActiveRecord::Migration[7.0]
  def change
    create_table :sand_useds do |t|
      t.integer :pounds
      t.string :stage
      t.date :date
      t.float :moisture
      t.belongs_to :site, null: false, foreign_key: true

      t.timestamps
    end
  end
end
