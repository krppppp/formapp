# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_10_31_035303) do

  create_table "subscriptions", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "payjp_id", null: false
    t.bigint "user_id"
    t.integer "status", null: false
    t.integer "current_period_start"
    t.integer "current_period_end"
    t.integer "trial_start"
    t.integer "trial_end"
    t.integer "canceled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_subscriptions_on_user_id"
  end

  create_table "tops", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.integer "status", default: 0, null: false
    t.string "last_name"
    t.string "first_name"
    t.string "last_name_kana"
    t.string "first_name_kana"
    t.string "email", null: false
    t.integer "business_type"
    t.integer "birthday"
    t.string "phone_number"
    t.integer "postcode"
    t.string "prefecture"
    t.integer "prefecture_number"
    t.string "city"
    t.string "address"
    t.string "address_small"
    t.integer "price"
    t.string "co_name"
    t.string "co_name_kana"
    t.string "co_number"
    t.integer "business_number"
    t.string "business_alphabet"
    t.string "business"
    t.string "business_middle"
    t.string "business_small"
    t.integer "financial_month"
    t.integer "co_address_postcode"
    t.integer "establishment_date"
    t.string "co_prefecture"
    t.string "co_city"
    t.string "co_address"
    t.string "co_address_small"
    t.string "capital_stock"
    t.text "about_business"
    t.string "number_of_employees"
    t.integer "number_of_regular_employees"
    t.integer "number_of_shop"
    t.integer "before_the_previous_fiscal_year_ended"
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
    t.text "image1"
    t.text "image2"
    t.text "image3"
    t.text "image4"
    t.text "image5"
    t.text "image6"
    t.text "image7"
    t.text "image8"
    t.text "image9"
    t.text "image10"
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
    t.index ["email"], name: "index_members_on_email", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_members_on_reset_password_token"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_members_on_unlock_token", unique: true
  end

end
