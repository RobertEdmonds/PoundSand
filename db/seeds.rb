print("Seeding")
print(Date.current())
User.create!(name: "Robert Edmonds", username: "RobertEdmonds", password: "Hello645$", password_confirmation: "Hello645$")
User.create!(name: "Anna Omsberg", username: "AnnaOmsberg", password: "Hello123$", password_confirmation: "Hello123$")
print("Seeding done")
