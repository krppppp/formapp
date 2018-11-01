class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.string :payjp_id, null: false
      t.references :user
      t.integer :status, null: false
      t.integer :current_period_start
      t.integer :current_period_end
      t.integer :trial_start
      t.integer :trial_end
      t.integer :canceled_at

      t.timestamps
    end
  end
end
