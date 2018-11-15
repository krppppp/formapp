class ApplicationController < ActionController::Base

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :title, :menu1, :menu2, :menu3, :menu4, :menu5,
                                                         :heading1, :heading2, :heading3, :heading4, :heading5,
                                                         :subheading1, :subheading2, :subheading3, :subheading4, :subheading5,
                                                         :headline1, :headline2, :headline3,
                                                         :menu1_1, :menu2_1, :menu3_1, :menu4_1, :menu5_1])
    end
  def authenticate_user?
    unless current_user
      redirect_to new_user_registration_path
    end
  end
end

