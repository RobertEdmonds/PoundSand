class CreateCompanyUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :company_users do |t|
      t.string :email
      t.string :password_digest
      t.belongs_to :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
