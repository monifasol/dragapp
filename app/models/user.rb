class User < ActiveRecord::Base
  has_and_belongs_to_many :applics
  attr_accessible :id, :username
end
