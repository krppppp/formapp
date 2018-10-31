class SendMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.send_mailer.send_when_update.subject
  #
  def send_when_update(user, pass_temp, url)
    @user = user
    @pass = pass_temp
    @url = url
    mail to:      user.email,
         subject: '会員情報が更新されました。'
  end
end
