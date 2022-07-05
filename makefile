# Commake (v0.0.2) - https://niallbunting.com/commake/

.PHONY: all help init install build run lint test e2e plan deploy int versioncheck
.ONESHELL:
all: lint test run #help Full check

help:
	@echo "-- HELP --"
	@grep '#[h]elp' makefile

# Use this to check if they have the correct version
# To use update the if statement and the message.
versioncheck:
	@if [ 0 -gt 0 ]; then
		echo "Wrong version of: <DEP>" &&
		exit 1;
	fi

init: #help Run through dependencies and check
	@echo brew install brew-gem
	@echo brew gem install jekyll
	@echo "\nor\n"
	@echo "sudo apt-get install ruby-full build-essential zlib1g-dev"
	@echo "echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc"
	@echo "echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc"
	@echo "echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc"
	@echo "source ~/.bashrc"
	@echo "gem install jekyll bundler"

install: versioncheck #help Install packages
	@echo "gem install github-pages"
	gem install github-pages
	echo "bundle install"
	bundle install	
	echo "bundle add webrick"
	bundle add webrick

build: #help Bulid the project files
	@echo Not Implemented

run: #help Run Locally
	bundle exec jekyll serve --baseurl=""

lint: #help Run linting
	@echo Not Implemented

test: #help Run the unit tests
	@echo Not Implemented

int: #help Run the int tests
	@echo Not Implemented

e2e: #help Run the e2e tests
	@echo Not Implemented

plan: #help Plan to run any infra changes
	@echo "Commit your changes!"

deploy: #help Run any infra changes
	@echo Just push to remote
	git push

# Custom Commands - Put your custom commands below
