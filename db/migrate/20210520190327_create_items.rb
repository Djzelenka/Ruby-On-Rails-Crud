class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.float.round(2) :cost

      t.timestamps
    end
  end
end
