class Api::DashboardController < Api::ApiController
  before_action :ensure_logged_in

  def dashboard
  end
end