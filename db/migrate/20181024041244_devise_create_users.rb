# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.integer "status", default: 0, null: false
      #アカウント作成時の情報
      t.string "last_name"
      t.string "first_name"
      t.string "last_name_kana"
      t.string "first_name_kana"
      t.string "email", null: false
      t.integer "business_type"

      #申請者情報
      t.integer "birthday" #半角８桁
      t.string "phone_number" #半角11桁
      t.integer "postcode"#半角７桁
      #zip_code = 'xxxyyyy'
      # zip_code.insert(3, '-').split('-')　# '-'じゃなくてもよい
      t.string "prefecture" #
      t.integer "prefecture_number" #都道府県ナンバー
      t.string "city"
      t.string "address"
      t.string "address_small"
      t.integer "price" #支払い額 1000000 500000  300000


      #会社情報
      t.string "co_name"
      t.string "co_name_kana"
      t.string "co_number" #13桁

      t.integer "business_number" #4桁
      t.string "business_alphabet"
      t.string "business"
      t.string "business_middle"
      t.string "business_small"
      t.integer "financial_month"
      t.integer "co_address_postcode"#半角7桁
      t.integer "establishment_date"#半角８桁
      t.string "co_prefecture"
      t.string "co_city"
      t.string "co_address"
      t.string "co_address_small"
      t.string "capital_stock" #診断ツールと申請で桁が違うので注意
      t.text    "about_business"
      t.string "number_of_employees"
      t.integer "number_of_regular_employees"
      t.integer "number_of_shop"

      #診断ツール用決算数値
      t.integer "before_the_previous_fiscal_year_ended"  #前々期決算あるかどうか

      #前々期決算
      t.string "before_the_previous_fiscal_year_employee"
      t.string "before_the_previous_fiscal_year_average_work_time"
      t.string "before_the_previous_fiscal_year_sales"
      t.string "before_the_previous_fiscal_year_pre_sales"
      t.string "before_the_previous_fiscal_year_capital"
      t.string "before_the_previous_fiscal_year_operating_income"
      t.string "before_the_previous_fiscal_year_loan"
      t.string "before_the_previous_fiscal_year_cash_deposit"
      t.string "before_the_previous_fiscal_year_depreciation_cost"
      t.string "before_the_previous_fiscal_year_total_net_assets"
      t.string "before_the_previous_fiscal_year_total_liabilities"
      t.string "before_the_previous_fiscal_year_accounts_receivable"
      t.string "before_the_previous_fiscal_year_bills_recivable"
      t.string "before_the_previous_fiscal_year_inventory"
      t.string "before_the_previous_fiscal_year_accounts_payable"
      t.string "before_the_previous_fiscal_year_bills_payable"

      #前期決算
      t.string "previous_fiscal_year_employee"
      t.string "previous_fiscal_year_average_work_time"
      t.string "previous_fiscal_year_sales"
      t.string "previous_fiscal_year_pre_sales"
      t.string "previous_fiscal_year_capital"
      t.string "previous_fiscal_year_operating_income"
      t.string "previous_fiscal_year_loan"
      t.string "previous_fiscal_year_cash_deposit"
      t.string "previous_fiscal_year_depreciation_cost"
      t.string "previous_fiscal_year_accounts_receivable"
      t.string "previous_fiscal_year_total_net_assets"
      t.string "previous_fiscal_year_total_liabilities"
      t.string "previous_fiscal_year_bills_recivable"
      t.string "previous_fiscal_year_inventory"
      t.string "previous_fiscal_year_accounts_payable"
      t.string "previous_fiscal_year_bills_payable"






      t.integer "introducer"
      t.string "tel"
      t.integer "amount"




      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false

      t.string "address"

      t.string "title"

      t.text "headline1"
      t.text "headline2"
      t.text "headline3"
      t.text "headline4"
      t.text "headline5"
      t.text "headline6"
      t.text "headline7"
      t.text "headline8"
      t.text "headline9"
      t.text "headline10"

      t.string "menu1"
      t.string "menu2"
      t.string "menu3"
      t.string "menu4"
      t.string "menu5"

      t.text "menu1_1"
      t.text "menu2_1"
      t.text "menu3_1"
      t.text "menu4_1"
      t.text "menu5_1"

      t.text "image1", limit: 65535
      t.text "image2", limit: 65535
      t.text "image3", limit: 65535
      t.text "image4", limit: 65535
      t.text "image5", limit: 65535
      t.text "image6", limit: 65535
      t.text "image7", limit: 65535
      t.text "image8", limit: 65535
      t.text "image9", limit: 65535
      t.text "image10", limit: 65535

      t.string "main_color"
      t.string "sub_color"
      t.string "sub2_color"
      t.text "self"

      t.string "domain1"
      t.string "domain2"
      t.string "domain3"

      t.string "payjp_id"


      t.string "encrypted_password", default: "", null: false
      t.string "reset_password_token"
      t.datetime "reset_password_sent_at"
      t.datetime "remember_created_at"
      t.integer "sign_in_count", default: 0, null: false
      t.datetime "current_sign_in_at"
      t.datetime "last_sign_in_at"
      t.string "current_sign_in_ip"
      t.string "last_sign_in_ip"
      t.string "confirmation_token"
      t.datetime "confirmed_at"
      t.datetime "confirmation_sent_at"
      t.string "unconfirmed_email"
      t.integer "failed_attempts", default: 0, null: false
      t.string "unlock_token"
      t.datetime "locked_at"
      t.string "crypted_password"
      t.string "salt"


      t.index ["email"], name: "index_members_on_email", unique: true, using: :btree
      t.index ["reset_password_token"], name: "index_members_on_reset_password_token", using: :btree
      t.index ["unlock_token"], name: "index_members_on_unlock_token", unique: true, using: :btree
      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :reset_password_token, unique: true
    # add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,         unique: true
  end
end
