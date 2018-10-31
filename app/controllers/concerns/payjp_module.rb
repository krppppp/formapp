module PayjpModule
  extend ActiveSupport::Concern


  #カードトークンの登録メソッド
  def create_payjp_customer(user, card_token)
    Payjp.api_key = Rails.application.secrets.payjp_private_key
    customer = Payjp::Customer.create(
        email: user.email,
        card: card_token
    )
    user.update!(payjp_id: customer.id)
  end

  def create_subscription(user, card_token) #プラン単体購入
    create_payjp_customer(user, card_token) if user.payjp_id.blank?
    Payjp.api_key = Rails.application.secrets.payjp_private_key
    sub = Payjp::Subscription.create(
        plan: 'pln_9684d6d993a0bd24d023737805cb',
        customer: user.payjp_id,
        )
    Subscription.create!(
        payjp_id: sub.id,
        user: user,
        status: sub.status,
        current_period_start: sub.current_period_start,
        current_period_end: sub.current_period_end,
        trial_start: sub.trial_start,
        trial_end: sub.trial_end
    )
  end



end
