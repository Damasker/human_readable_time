module LuxuryButtons
  module LuxuryButtons
    class Hooks  < Redmine::Hook::ViewListener
      def view_layouts_base_content(context)
        javascript_include_tag(:application, :plugin => 'human_readable_time')
      end
    end
  end
end
