print("Seeding")
print(Date.current())
User.create!(name: "Robert Edmonds", username: "RobertEdmonds", password: "Hello645$", password_confirmation: "Hello645$")
User.create!(name: "Anna Omsberg", username: "AnnaOmsberg", password: "Hello123$", password_confirmation: "Hello123$")
Site.create!(location: "texas", start_date: Date.current())
Site.create!(location: "florida", start_date: Date.current())
Site.create!(location: "colorado", start_date: Date.current())
# Truck.create!(truck: "5440", mine: "Blue", date: Date.current(), tare_weight: 36399, gross_weight: 89399, ship_to: "texas", po: "702000069", site_id: 1)
print("Seeding done")
