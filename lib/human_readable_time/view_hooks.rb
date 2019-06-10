module LuxuryButtons
  module LuxuryButtons
    class Hooks  < Redmine::Hook::ViewListener
      def view_layouts_base_content(context)
        javascript_include_tag(:application, :plugin => 'luxury_buttons')
      end
    end
  end
end
