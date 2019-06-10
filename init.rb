Redmine::Plugin.register :human_readable_time do
  name 'Human Readable Time plugin'
  author 'Mykhaylo Syminenko'
  description 'This is a plugin for Redmine, change time in reports to human readable'
  version '0.0.1'
  url 'https://github.com/Damasker/human_readable_time'
  author_url 'https://github.com/Damasker'

  require 'human_readable_time/view_hooks'
end
