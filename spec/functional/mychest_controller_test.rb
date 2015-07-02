require 'test_helper'

class MychestControllerTest < ActionController::TestCase
  
  describe Applic do
    before do
      @applic = Applic.new({:id => '1', :name => 'remy', :pic => 'remy.jpg'})
    end

    puts "*******************"
    puts "holaaaaaaaaaaaaaaaaaaaaa"
    it "should drag item to new list", :js => true do
      
      # verify that item is withing group 1
      visit '/mychest/index'
      within("#div_my_apps") do # id of a div element (or ul element)
        page.should have_content("remy")
      end    

      item_element = find("##{@applic.id}")     
      new_group_element = find("#div_market_apps")
      item_element.drag_to new_group_element

      # verify that after page reload item is withing the new group
      visit '/mychest/index'
      within("#div_market_apps") do 
        page.should have_content("remy")
      end

    end
  end


end
