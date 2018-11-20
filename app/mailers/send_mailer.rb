class SendMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.send_mailer.send_when_update.subject
  #
  
  def send_when_registration(user, pass_temp)
    @user = user
    @pass = pass_temp
    mail to:      "black@akitennis.co.jp, krppppp@gmail.com",
         subject: '新しいセミナー参加者が登録されました。'
  end

  def send_when_update(user, pass_temp)
    @user = user
    @pass = pass_temp
    mail to:      user.email,
         subject: '会員情報が更新されました。'
  end

  def send_when_subscription_create(user)
    @user = user
    mail to:      user.email,
         subject: '会員情報が更新されました。'
  end

  def send_to_creator_new_record(user)
    @user = user
    mail to:      "black@akitennis.co.jp",
         subject: 'ホームページ情報を新しく受信しました'
  end

  def send_to_creator_updated(user)
    @user = user
    mail to:      "black@akitennis.co.jp",
         subject: 'ホームページ情報を更新しました'
  end

end
