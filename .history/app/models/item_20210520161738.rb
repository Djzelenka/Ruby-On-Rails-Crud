class Item < ApplicationRecord
  validates :name, presence: true, length: { minimum: 1, maximum: 20 }
  validates :description, presence: true, length: { minimum: 1, maximum: 80 }
  validates_numericality_of :cost, :greater_than_or_equal_to => 0 


end
