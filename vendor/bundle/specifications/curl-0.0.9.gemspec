# -*- encoding: utf-8 -*-
# stub: curl 0.0.9 ruby lib

Gem::Specification.new do |s|
  s.name = "curl".freeze
  s.version = "0.0.9"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["tg0".freeze]
  s.date = "2011-03-10"
  s.description = "Some simple methods to use shell curl".freeze
  s.email = "email@tg0.ru".freeze
  s.homepage = "http://github.com/tg0/curl".freeze
  s.rdoc_options = ["--inline-source".freeze, "--charset=UTF-8".freeze]
  s.rubyforge_project = "curl".freeze
  s.rubygems_version = "2.6.8".freeze
  s.summary = "shell CURL ruby wrapper.".freeze

  s.installed_by_version = "2.6.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<awesome_print>.freeze, [">= 0.2.1"])
      s.add_runtime_dependency(%q<unidecoder>.freeze, [">= 1.1.1"])
    else
      s.add_dependency(%q<awesome_print>.freeze, [">= 0.2.1"])
      s.add_dependency(%q<unidecoder>.freeze, [">= 1.1.1"])
    end
  else
    s.add_dependency(%q<awesome_print>.freeze, [">= 0.2.1"])
    s.add_dependency(%q<unidecoder>.freeze, [">= 1.1.1"])
  end
end
