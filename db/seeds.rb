# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

items = Item.create([

  {
    name: "Tool",
    description: "Used in a variety of projects",
    cost: 12.22
  },
    {
    name: "Pool Noodle",
    description: "Fun for pool parties",
    cost: 10.99
  },
    {
    name: "Abbacus",
    description: "Old school maths",
    cost: 20.00
  },
    {
    name: "Lawn Mower",
    description: "Cutting grass is a breeze",
    cost: 111.99
  },
    {
    name: "Chair",
    description: "So ergonomic",
    cost: 50.25
  },
    {
    name: "Desk",
    description: "Multi-purpose desk with standing capablity",
    cost: 200.11
  },
])