class TemplatesController < ApplicationController

  def p1
    @user =User.find_by(name: params[:name])
  end
  def p2
    @user =User.find_by(name: params[:name])

  end
  def p3
    @user =User.find_by(name: params[:name])

  end
end
