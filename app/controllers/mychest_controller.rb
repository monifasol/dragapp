class MychestController < ApplicationController
  
  def index
    @my_apps = current_user.applics
    @market_apps = Applic.all
  end

  def remove_all
    applics = Applic.all
    for a in applics
      if current_user.applics.include?(a)
        current_user.applics.delete(a)
      end
    end
    @my_apps = current_user.applics
    @market_apps = Applic.all
    respond_to do |format|
      format.js { render action: 'update_list_apps'}
    end
  end

  def install_all
    applics = Applic.all
    for a in applics
      unless current_user.applics.include?(a)
        current_user.applics << a
      end
    end
    @my_apps = current_user.applics
    @market_apps = Applic.all
    respond_to do |format|
      format.js { render action: 'update_list_apps'}
    end
  end

  def install_app
    applic = Applic.find(params[:id])
    current_user.applics << applic
    render nothing: true
  end

  def remove_app
    applic = Applic.find(params[:id])
    current_user.applics.delete(applic)
    render nothing: true
  end

end
