class CreateApplics < ActiveRecord::Migration
  def change
    create_table :applics do |t|
      t.integer :id
      t.string :name
      t.string :pic

      t.timestamps
    end
  end
end
