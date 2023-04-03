class CreateSandOnSites < ActiveRecord::Migration[7.0]
  def change
    create_table :sand_on_sites do |t|
      t.integer :pounds
      t.float :moisture
      t.date :date
      t.belongs_to :site, null: false, foreign_key: true

      t.timestamps
    end
  end
end
