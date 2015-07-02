class Applic < ActiveRecord::Base
    has_and_belongs_to_many :users
    attr_accessible :id, :name, :pic
end
