.PHONY: all help init install build run lint test e2e plan deploy
all: lint test run #help Full check

help:
	@echo "-- HELP --"
	@grep '#[h]elp' makefile

init: #help Run through dependencies and check
	@echo brew install brew-gem
	@echo brew gem install jekyll

install: #help Install packages
	bundle install	

build: #help Bulid the project files
	@echo Not Implemented

run: #help Run Locally
	bundle exec jekyll serve --baseurl=""

lint: #help Run linting
	@echo Not Implemented

test: #help Run the unit tests
	@echo Not Implemented

e2e: #help Run the e2e tests
	@echo Not Implemented

plan: #help Plan to run any infra changes
	@echo Not Implemented

deploy: #help Run any infra changes
	@echo Just push to remote
	git push
