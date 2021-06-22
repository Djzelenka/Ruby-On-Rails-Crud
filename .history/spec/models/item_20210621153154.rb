require 'rails_helper'

RSpec.describe Item, :type => :model do
  before(:each) do 
    item = Item.new(name: "Test Item", description: "This is a test item", cost: 14.99)
  end

    it 'is valid with valid attributes' do
      expect(item) to be_valid
    end

    it 'is not valid without a name' do 
      item.name = ""
      expect(item).to_not be_valid
    end

    it 'is not valid without a description'
      item.description = ""
      expect(item).to_not be_valid
    end

    it 'is not valid with a negative cost value'
      item.cost = -2.00
      expect(item).to_not be_valid
    end

    it 'is not valid with a description too long'
      item.description = "Described item" * 10
      expect(item).to_not be_valid
    end

    it 'is not valid with a name too long'
      item.name = "Name" * 10
      expect(item).to_not be_valid
    end
end