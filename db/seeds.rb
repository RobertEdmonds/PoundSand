print("Seeding")
print(Date.current())
User.create!(name: "Robert Edmonds", username: "RobertEdmonds", password: "Hello123$", password_confirmation: "Hello123$", boss: true)
User.create!(name: "Rylan Johnson", username: "RylanJohnson", password: "Hello123$", password_confirmation: "Hello123$", boss: true)
User.create!(name: "Brian Blackburn", username: "BrianBlackburn", password: "Hello123$", password_confirmation: "Hello123$", boss: true)
print("Seeding done")


