# Preview all emails at http://localhost:3000/rails/mailers/send_mailer
class SendMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/send_mailer/send_when_update
  def send_when_update
    SendMailer.send_when_update
  end

end
