class SubscriptionsController < ApplicationController
  include PayjpModule

  def index
    redirect_to new_plan_subscription_path if !current_member.has_valid_subscription?
    @subscription = current_member.subscriptions.last
  end

  def new
    redirect_to plan_subscriptions_path if current_member.has_valid_subscription?
  end



  def create
    create_subscription(current_member, params['payjp-token'])
    redirect_to new_plan_subscription_path, info: '定額プランの購入を完了しました。'
  end

  def show
    @user = User.find(params[:id])
    @id = 1
    @subscription = current_user.subscriptions.last
  end

  def destroy
    @subscription = Subscription.find(params[:id])
    if @subscription.member != current_member
      redirect_to plan_subscriptions_path, info: '問題が発生しました。'
    end
    cancel_subscription @subscription
    redirect_to root_path, info: '定額プランをキャンセルしました。'
  end
end
