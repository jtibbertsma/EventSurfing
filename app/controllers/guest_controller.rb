class GuestController < ApplicationController
  def guest
    joseph = User.find_by(email: "email@email.com")
    @user = User.create(name: "Guest", email: SecureRandom.urlsafe_base64 + "@example.com", password: "password123")

    Message.create(
      sender: joseph,
      recipient: @user,
      subject: "Welcome to EventSurfing!",
      content: "Thanks for checking out my site EventSurfing, where everything is made up and the points dont matter. Take a look around! Enjoy the modals. Theyre pretty!"
    )

    login!
    redirect_to root_url
  end
end