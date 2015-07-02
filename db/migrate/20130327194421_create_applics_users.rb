class CreateApplicsUsers < ActiveRecord::Migration
  def change
    create_table :applics_users do |t|
      t.integer :applic_id
      t.integer :user_id
    end
  end
end
